/* Desktop.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		Fri Dec  9 16:27:21     2005, Created by tomyeh@potix.com
}}IS_NOTE

Copyright (C) 2005 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package com.potix.zk.ui;

import java.util.Map;
import java.util.Collection;

/**
 * Represents a desktop.
 * All pages that is created from the same URL is called a desktop.
 *
 * <p>A desktop is created automatically when the first page is created
 * during a request.
 *
 * <p>To access a {@link Page}, its desktop must be locked first.
 * Once a desktop is locked to a request, all pages
 * contained in this desktop are free to access.
 * 
 * @author <a href="mailto:tomyeh@potix.com">tomyeh@potix.com</a>
 */
public interface Desktop {
	/** Returns ID of this desktop.
	 * It is unique in the whole session.
	 */
	public String getId();
	/** Returns the execution, or null if this desktop is not under
	 * seving any execution (aka., not locked).
	 */
	public Execution getExecution();
	/** Returns the session of this desktop.
	 */
	public Session getSession();
	/** Returns the Web application this desktop belongs to.
	 */
	public WebApp getWebApp();

	/** Returns the page of the specified ID.
	 *
	 * <p>This is one of the only few method you could access
	 * before activating an execution.
	 *
	 * @exception ComponentNotFoundException if page not found
	 */
	public Page getPage(String pageId);
	/** Returns a readonly collection of all {@link Page} in this desktop.
	 */
	public Collection getPages();
	/** Returns whether a page exists.
	 */
	public boolean hasPage(String id);

	/** Returns all custom attributes associated with this desktop.
	 */
	public Map getAttributes();
	/** Returns the value of the specified custom attribute associated with the desktop.
	 */
	public Object getAttribute(String name);
	/** Sets the value of the specified custom attribute associated with the desktop.
	 */
	public Object setAttribute(String name, Object value);
	/** Removes the specified custom attribute associated with the desktop.
	 */
	public Object removeAttribute(String name);

	/** Returns all components contained in this page.
	 */
	public Collection getComponents();
	/** Returns the component of the specified UUID ({@link Component#getUuid}).
	 * @exception ComponentNotFoundException if component not found
	 */
	public Component getComponentByUuid(String uuid);
	/** Returns the component of the specified UUID
	 * ({@link Component#getUuid}), or null if not found.
	 */
	public Component getComponentByUuidIfAny(String uuid);

	/** Returns the URI for asynchronous update.
	 *
	 * <p>You rarely need this method unless for implementing special
	 * components, such as file upload.
	 *
	 * @param pathInfo the path to append to the returned URI, or null
	 * to ignore
	 */
	public String getUpdateURI(String pathInfo);

	/** Returns the current directory (never null).
	 * It is empty if no current directory at all.
	 * Otherwise, it must end with '/'.
	 * In other words, you could use getCurrentDirectory() + relative_path.
	 */
	public String getCurrentDirectory();

	/** Returns the current bookmark (never null).
	 * The returned might be the same as the last call to {@link #setBookmark},
	 * because user might use BACK, FORWARD or others to change the bookmark.
	 */
	public String getBookmark();
	/** Sets a bookmark to this desktop. Then, when user press BACK, FORWARD
	 * or specify an URL with this bookmark, the onBookmarkChanged event
	 * is sent to all pages of the desktop.
	 */
	public void setBookmark(String name);
}
