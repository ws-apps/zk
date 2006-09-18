/* ComponentNotFoundException.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Sun Jun  5 12:05:40     2005, Created by tomyeh@potix.com
}}IS_NOTE

Copyright (C) 2004 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package com.potix.zk.ui;

/**
 * Dentoes a component cannot be found.
 *
 * @author <a href="mailto:tomyeh@potix.com">tomyeh@potix.com</a>
 */
public class ComponentNotFoundException extends UiException {
	public ComponentNotFoundException(String msg, Throwable cause) {
		super(msg, cause);
	}
	public ComponentNotFoundException(String s) {
		super(s);
	}
	public ComponentNotFoundException(Throwable cause) {
		super(cause);
	}
	public ComponentNotFoundException() {
	}

	public ComponentNotFoundException(int code, Object[] fmtArgs, Throwable cause) {
		super(code, fmtArgs, cause);
	}
	public ComponentNotFoundException(int code, Object fmtArg, Throwable cause) {
		super(code, fmtArg, cause);
	}
	public ComponentNotFoundException(int code, Object[] fmtArgs) {
		super(code, fmtArgs);
	}
	public ComponentNotFoundException(int code, Object fmtArg) {
		super(code, fmtArg);
	}
	public ComponentNotFoundException(int code, Throwable cause) {
		super(code, cause);
	}
	public ComponentNotFoundException(int code) {
		super(code);
	}
}
