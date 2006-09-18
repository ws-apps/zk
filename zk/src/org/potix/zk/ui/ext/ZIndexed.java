/* ZIndexed.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Sat Dec 24 23:01:45     2005, Created by tomyeh@potix.com
}}IS_NOTE

Copyright (C) 2004 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package com.potix.zk.ui.ext;

/**
 * Used to decorate a {@link com.potix.zk.ui.Component} object that
 * its ZIndex is modifiable by the client.
 *
 * <p>Once it is moved by the user, {@link #setZIndexByClient}
 * are called and {@link com.potix.zk.ui.event.ZIndexEvent} is sent to notify the component.
 * 
 * @author <a href="mailto:tomyeh@potix.com">tomyeh@potix.com</a>
 */
public interface ZIndexed {
	/** Sets the z-index of the component, caused by user's activity at
	 * the client.
	 */
	public void setZIndexByClient(int zIndex);
}
