/* boot.js

	Purpose:
		
	Description:
		
	History:
		Sat Oct 18 19:24:38     2008, Created by tomyeh

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
*/
/** Begins the creating of new page(s). */
function zknewbg() {
	zk.creating = true;
	zk.startProcessing(600);
}
/** Ends the creating of new page(s). */
function zknewe() {
	zk.creating = false;
	_zkbWgts = []; //clean up if failed
	zkcurdt = null;
}

/** Used internally. */
function _zkbPush(w) {
	w.children = [];
	if (_zkbWgts.length > 0)
		_zkbWgts[0].children.$add(w);
	_zkbWgts.unshift(w);
}
/** Used internally. */
function _zkbPop() {
	var w = _zkbWgts.shift();
	if (!_zkbWgts.length) {
		_zkLdJS(w); //OK to load JS before document.readyState complete

		_zkbcrs.push([zkcurdt, w]);

		if (zk.creating) { //creating a new page
			if (zk.booted)
				_zkLdNew();
			else if (document.readyState) {
				var tid = setInterval(function(){
					if (/loaded|complete/.test(document.readyState)) {
						clearInterval(tid);
						if (!zk.booted) _zkSysInit();
						_zkLdNew();
					}
				}, 50);
			} else //gecko
				setTimeout(_zkLdNew, 100);
				//don't count on DOMContentLoaded since the page might
				//be loaded by another ajax solution (i.e., portal)
				//Also, Bug 1619959: FF not fire it if in 2nd iframe
		} else //AU
			_zkAuNew();
	}
}

/** Returns the top most widget being processed (pushed by
 * zkpgbg or zkbg).
 */
function zkbTop() {
	return _zkbWgts[0];
}
/** Begins the creation of a page generated by the server.
 *
 * @param contained if a page is not owned by another page, and
 * it doesn't cover the whole browser window (included by non-ZK tech)
 */
function zkpgbg(pgid, style, dtid, contained, updateURI) {
	var props = {};
	if (style) props.style = style;
	if (dtid) zkdtbg(dtid, updateURI).pgid = pgid;
	_zkbPush({type: "#p", uuid: pgid, contained: contained, props: props});
}
/** Ends the creation of a page.
 */
zkpge = _zkbPop;

/** Begins the creation of a widget generated by the server.
 */
function zkbg(type, uuid, mold, props) {
	_zkbPush({type: type, uuid: uuid, mold: mold, props: props});
}
/** Ends the creation of a widget. */
zke = _zkbPop;

/** Begins the creation of a desktop generated by the server.
 * This method is called only if zkpgbg is not called.
 * <p>Note: there is no zken().
 */
function zkdtbg(dtid, updateURI) {
	var dt = zk.Desktop.$(dtid);
	if (dt == null) dt = new zk.Desktop(dtid, updateURI);
	else if (updateURI) dt.updateURI = updateURI;
	zkcurdt = dt;
	return dt;
}

//Init Only//
/** Sets the version. */
function zkver() {
	var args = arguments, len = args.length;
	zk.version = args[0];
	zk.build = args[1];

	for (var j = 2; j < len; j += 2)
		zPkg.version(args[j], args[j + 1]);
}

/** Sets the options. */
function zkopt(opts) {
	for (var nm in opts) {
		var val = opts[nm];
		switch (nm) {
		case "pd": zk.procDelay = val; break;
		case "td": zk.tipDelay =  val; break;
		case "rd": zk.resendDelay = val; break;
		case "dj": zk.debugJS = val; break;
		case "kd": zk.keepDesktop = val; break;
		case "pf": zk.pfmeter = val; break;
		}
	}
}

/** Adds a function that will be executed after widgets are created.
 * It is called immediately if widgets are created.
 * It is used by ZK Loader to generate JavaScript codes that will
 * be executed
 */
function zkafter(fn) {
	if (!zk.booted)
		return _zkafcrs.$add(fn, true);
	fn();
	return true;
}
var _zkafcrs = [];

/** Adds a function that will be executed after the document
 * is intialized (i.e., zk.booted is true). It is called immediately
 * if the document is initialized.
 */
function zkafterBoot(fn) {
	if (!zk.booted)
		return _zkafbts.$add(fn, true);
	fn();
	return true;
}
var _zkafbts = [];

//Internal Use//
/** Initiailizes document (called only once). */
function _zkSysInit() {
	zk.booted = true;

	//TODO more listener
	zEvt.listen(document, "keydown", _zkDocKeyDown);

	zEvt.listen(document, "mousedown", _zkDocMouseDown);
	zEvt.listen(document, "mouseover", _zkDocMouseOver);
	zEvt.listen(document, "mouseout", _zkDocMouseOut);

	zEvt.listen(document, "click", _zkDocClick);
	zEvt.listen(document, "dblclick", _zkDocDblClick);
	zEvt.listen(document, "contextmenu", _zkDocCtxMenu);

	zEvt.listen(window, "scroll", _zkDocScroll);
	zEvt.listen(window, "resize", _zkDocResize);

	for (var fn, afbts = _zkafbts; fn = afbts.shift();)
		fn();
}
/** Attaches the widgets generated by ZK loader. */
function _zkLdNew() {
	zPkg.afterLoad(_zkLdNew0);
}
function _zkLdNew0() {
	if (!zk.booted) _zkSysInit();

	var ws = [];
	for (var inf; inf = _zkbcrs.shift();) {
		var dt = inf[0],
			wgt = _zkCreate(null, inf[1]);
		wgt.replaceHTML(wgt.uuid, dt);
		ws.push(wgt);
	}

	for (var fn, afcrs = _zkafcrs; fn = afcrs.shift();)
		fn();

	while (wgt = ws.shift()) {
		zWatch.fireDown('beforeSize', -1, wgt);
		zWatch.fireDown('onSize', 5, wgt);
	}

	zk.endProcessing();
}
/** Creates the widgets generated by ZK loader. */
function _zkAuNew() {
	zPkg.afterLoad(function () {_zkAuNew0(zAu.stub);});
}
function _zkAuNew0(fn) {
	for (var inf; inf = _zkbcrs.shift();)
		fn(_zkCreate(null, inf[1]));
}
/** Used internally to create the widget tree. */
function _zkCreate(parent, wginf) {
	var wgt, props = wginf.props;
	if (wginf.type == "#p") {
		wgt = new zk.Page(wginf.uuid, wginf.contained);
		wgt.inServer = true;
		if (parent) parent.appendChild(wgt);
	} else {
		var cls = zk.$import(wginf.type),
			uuid = wginf.uuid,
			wgt = new cls(uuid, wginf.mold),
			embedAs = cls.embedAs;
		wgt.inServer = true;
		if (parent) parent.appendChild(wgt);

		//embedAs means value from element's text
		if (embedAs && !props[embedAs]) {
			var embed = zDom.$(uuid);
			if (embed)
				props[embedAs] = embed.innerHTML;
		}
	}

	//assign properties
	zk.set(wgt, props);

	for (var j = 0, childs = wginf.children, len = childs.length;
	j < len; ++j)
		_zkCreate(wgt, childs[j]);

	return wgt;
}
/** Used internally to load package of the specified widget/page. */
function _zkLdJS(w) {
	var type = w.type; j = type.lastIndexOf('.');
	if (j >= 0)
		zPkg.load(type.substring(0, j), zkcurdt);
	for (var children = w.children, len = children.length, j = 0; j < len;++j)
		_zkLdJS(children[j]);
}

/** Used internally. */
var _zkbWgts = [], zkcurdt, _zkbcrs = []; //used to load widget

//Event Handler//
function _zkDocKeyDown(evt) {
}
function _zkDocMouseDown(evt) {
	zk.Widget.doMouseDown(zk.Widget.$(evt), evt);
}
function _zkDocMouseOver(evt) {
}
function _zkDocMouseOut(evt) {
}
function _zkDocClick(evt) {
	if (!evt) evt = window.event;

	if (zEvt.leftClick(evt)) {
		var wgt = zk.Widget.$(evt);
		for (; wgt; wgt = wgt.parent) {
			if (wgt.href) {
				zUtl.go(href, false, wgt.target, "target");
				return; //done
			}
			if (wgt.isListen('onClick')) {
				wgt.fire2("onClick", zEvt.mouseData(evt, wgt.node), {ctl:true});
				return;
			}
		}
		//no need to Event.stop
	}
	//don't return anything. Otherwise, it replaces event.returnValue in IE (Bug 1541132)
}
function _zkDocDblClick(evt) {
	if (!evt) evt = window.event;

	var wgt = zk.Widget.$(evt);
	for (; wgt; wgt = wgt.parent)
		if (wgt.isListen('onDoubleClick')) {
			wgt.fire2("onDoubleClick", zEvt.mouseData(evt, wgt.node), {ctl:true});
			return;
		}
}
function _zkDocCtxMenu(evt) {
}
function _zkDocScroll() {
}
function _zkDocResize() {
	if (!zk.booted)
		return; //IE6: it sometimes fires an "extra" onResize in loading

	//Tom Yeh: 20051230:
	//1. In certain case, IE will keep sending onresize (because
	//grid/listbox may adjust size, which causes IE to send onresize again)
	//To avoid this endless loop, we ignore onresize a whilf if _reszfn
	//is called
	//
	//2. IE keeps sending onresize when dragging the browser's border,
	//so we have to filter (most of) them out

	var now = zUtl.now();
	if (_zkbResz.lastTime && now < _zkbResz.lastTime)
		return; //ignore resize for a while (since zk.onSizeAt might trigger onsize)

	var delay = zk.ie ? 250: 50;
	_zkbResz.time = now + delay - 1; //handle it later
	setTimeout(_zkDocDidResize, delay);
}
function _zkDocDidResize () {
	if (!_zkbResz.time) return; //already handled

	var now = zUtl.now();
	if (zk.loading || zAnima.count || now < _zkbResz.time) {
		setTimeout(_zkDocDidResize, 10);
		return;
	}

	_zkbResz.time = null; //handled
	_zkbResz.lastTime = now + 1000;
		//ignore following for a while if processing (in slow machine)

	//TODO: _doClientInfo

	zWatch.fire('beforeSize');
	zWatch.fire('onSize');
	_zkbResz.lastTime = zUtl.now() + 8;
};
var _zkbResz = {};
