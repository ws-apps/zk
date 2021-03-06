/* B85_ZK_3831Test.java

	Purpose:
		
	Description:
		
	History:
		Tue Jan 16 2018, Created by klyve

Copyright (C) 2018 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.test2;

import org.junit.Assert;
import org.junit.Test;
import org.zkoss.zktest.zats.WebDriverTestCase;


public class B85_ZK_3831Test extends WebDriverTestCase {

    @Test
    public void test() {
        connect();
        Assert.assertTrue(jq("$innerLabel").exists());
        Assert.assertEquals("someValue",jq("$innerLabel").text().trim());
        Assert.assertEquals("This is arg1", jq("$label1").text().trim());
        Assert.assertEquals("This is arg2", jq("$label2").text().trim());
    }
}
