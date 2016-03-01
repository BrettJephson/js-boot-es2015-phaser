var doc;
var timeline;

var layerIndex = fl.getDocumentDOM().getTimeline().findLayerIndex("Layer 1");

fl.trace("layerIndex: "+layerIndex);

function init() {
	fl.outputPanel.clear();
	doc = fl.getDocumentDOM();
	timeline = doc.getTimeline();

	var currentFrame = getCurrentFrame();

	fl.trace("-- currentFrame:");
	fl.trace("name: " + currentFrame.name);
	fl.trace("as: " + currentFrame.actionScript);
	fl.trace("elems: " + currentFrame.elements);
  fl.trace("motion object? " + currentFrame.isMotionObject());

	if(currentFrame.isMotionObject()) {
		fl.outputPanel.clear();
		var geometrix = getGeometricPath(currentFrame.tweenObj);
		fl.trace("{ " +
		"\"start\":" + getStartingPosition(currentFrame) + ", \n" +
		"\"frames\": [" + geometrix + "] }");
    fl.trace(currentFrame.getMotionObjectXML());
		fl.outputPanel.save("file:///e|/export/test.json");
	}
	else {
		fl.trace("no motion");
	}
}

function getStartingPosition(frame) {
	var element = frame.elements[0];
	return matrixToString(element.matrix);
}

function matrixToString(mat) {
	return "{ \"a\": "+mat.a+", \"b\": "+mat.b+", \"c\": "+mat.c+", \"d\": "+mat.d+", \"tx\": "+mat.tx+", \"ty\": "+mat.ty+" }";
};

function getGeometricPath(tweenObject) {
	var path = [];
	var mat;
	var ending = ",";
	for(var i = 1; i<tweenObject.duration; i++) {
		mat = tweenObject.getGeometricTransform(i);
		if(i === tweenObject.duration-1) {
			ending = "";
		}
		path.push(matrixToString(mat)+ending);
	}
	return path.join("\n");
}

function getCurrentFrame() {
	var layer = timeline.layers[timeline.currentLayer];
	var frame = layer.frames[timeline.currentFrame];
	return frame;
}

init();
