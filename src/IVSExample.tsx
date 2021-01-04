import React, { useEffect, useRef } from 'react';
import { PlayerState, PlayerEventType, registerIVSQualityPlugin, registerIVSTech, VideoJSIVSTech, VideoJSQualityPlugin, VideoJSEvents } from 'amazon-ivs-player';
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

const wasmBinaryPath = '../../../node_modules/amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
const wasmWorkerPath = '../../../node_modules/amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';

const playbackUrl =
  "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8";

const playerOptions: VideoJsPlayerOptions = {
    autoplay: true,
    controls: true,
    muted: true,
}
export default function IVSExample(): JSX.Element {
    const playerRef = useRef(null);

    useEffect(() => {
        registerIVSTech(videojs, {
            wasmWorker: wasmWorkerPath,
            wasmBinary: wasmBinaryPath,
        });
        registerIVSQualityPlugin(videojs);

        const player = videojs(playerRef.current,
            playerOptions,
            () => { console.log('ivs player ready') }) as videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin
        
        player.src(playbackUrl);

        const events: VideoJSEvents = player.getIVSEvents();
        
        // bug occurs here:
        // const playerIVS = player.getIVSPlayer();

    });

    return (

        <div>
            <video ref={ playerRef } className='video-js'></video>
        </div>
        
    )
}
