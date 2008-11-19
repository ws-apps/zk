/* Caption.js

	Purpose:
		
	Description:
		
	History:
		Sun Nov 16 13:01:17     2008, Created by tomyeh

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under GPL Version 2.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
zul.wgt.Caption = zk.$extends(zul.LabelImageWidget, {
	//super//
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-caption";
	},
	domContent_: function () {
		var label = this.getLabel(),
			img = this.getImage(),
			title = this.parent ? this.parent.title: '';
		if (title) label = label ? title + ' - ' + label: title;
		label = zUtl.encodeXML(label);
		if (!img) return label;

		img = '<img src="' + img + '" align="absmiddle" />';
		return label ? img + ' ' + label: img;
	},
	bind_: function (desktop) {
		this.$super('bind_', desktop);

		var n = this.node, parent = this.parent;
		if (n && parent.$instanceof(zul.wgt.Groupbox))
			zEvt.listen(n, "click", zul.wgt.Caption.ongbclk);
	},
	unbind_: function () {
		var n = this.node, parent = this.parent;
		if (n && parent.$instanceof(zul.wgt.Groupbox))
			zEvt.unlisten(n, "click", zul.wgt.Caption.ongbclk);

		this.$super('unbind_');
	},

	//private//
	/** Whether to generate a close button. */
	_isCloseVisible: function () {
		var parent = this.parent;
		return parent.isClosable && parent.isClosable();
	},
	/** Whether to generate a minimize button. */
	_isMinimizeVisible: function () {
		var parent = this.parent;
		return parent.isMinimizable && parent.isMinimizable();
	},
	/** Whether to generate a maximize button. */
	_isMaximizeVisible: function () {
		var parent = this.parent;
		return parent.isMaximizable && parent.isMaximizable();
	}
},{
	ongbclk: function (evt) {
		var wgt = zk.Widget.$(evt);
		if (wgt && wgt.$instanceof(zul.wgt.Caption)) { //caption
			wgt = wgt.parent; //Groupbox
			wgt.setOpen(!wgt.isOpen());
		}
	}
});