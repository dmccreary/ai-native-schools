// Resize MicroSim iframes to the height their content reports.
// Infographic overlay sims (docs/sims/shared-libs/diagram.js) post a
// 'microsim-resize' message after load and on every resize.
window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'microsim-resize') return;
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === event.source) {
            iframes[i].style.height = event.data.height + 'px';
            break;
        }
    }
});
