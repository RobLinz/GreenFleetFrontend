import React from 'react';
import {createDevTools} from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const Debugger = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-i'
                 defaultIsVisible={false}
                 changeMonitorKey='ctrl-m'
                 changePositionKey='ctrl-shift-p'
                 defaultSize={0.2}
                 defaultPosition="right"
    >
        <LogMonitor markStateDiff />
    </DockMonitor>
);

export default Debugger