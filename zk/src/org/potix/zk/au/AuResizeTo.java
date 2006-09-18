/* AuResizeTo.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Fri Jul 28 15:57:13     2006, Created by tomyeh@potix.com
}}IS_NOTE

Copyright (C) 2006 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package com.potix.zk.au;

/**
 * A response to ask the client to resize the desktop (aka., the browser window)
 * to specified size (in pixel).
 *
 * <p>data[0]: x<br/>
 * data[1]: y
 * 
 * @author <a href="mailto:tomyeh@potix.com">tomyeh@potix.com</a>
 */
public class AuResizeTo extends AuResponse {
	public AuResizeTo(int x, int y) {
		super("resizeTo", new String[] {Integer.toString(x), Integer.toString(y)});
	}
}
