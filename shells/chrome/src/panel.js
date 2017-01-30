import './panel.html';
import '../../../frontend/static';

import App from '../../../frontend/components/App';

const port = chrome.extension.connect({name: '' + chrome.devtools.inspectedWindow.tabId});

const app = new App(
	{
		element: document.getElementById('container'),
		inspectDOM: (id) => {
			chrome.devtools.inspectedWindow.eval(
				`inspect(window.__METAL_DEV_TOOLS_HOOK__.getComponentNode('${id}'));`
			);
		},
		port
	}
);

chrome.devtools.network.onNavigated.addListener(function() {
	app.resetRoots();
	port.postMessage({type: 'initialize'});
});

port.postMessage({type: 'initialize'});
