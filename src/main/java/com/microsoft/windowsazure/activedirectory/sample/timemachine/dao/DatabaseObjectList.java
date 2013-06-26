/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.dao;

import java.util.ArrayList;

import org.json.JSONArray;

import com.microsoft.windowsazure.activedirectory.sdk.graph.exceptions.SdkException;
import com.microsoft.windowsazure.activedirectory.sdk.graph.helper.JSONHelper;

/**
 * @author Azure Active Directory Contributor
 *
 */
public class DatabaseObjectList<S extends DatabaseObject> {


	// The users hold the information of the users this page carries.
	protected ArrayList<S> databaseObjectList;
	
	
	/**
	 * The constructor of the UserList class. Initializes the user List.
	 */
	public DatabaseObjectList(){
		databaseObjectList = new ArrayList<S>();
	}
	
	public DatabaseObjectList(JSONArray array){
		databaseObjectList = new ArrayList<S>();
		for(int i = 0; i < array.length(); i++){
			S directoryObject = null;
			try {
				JSONHelper.convertJSONObjectToDirectoryObject(array.optJSONObject(i), directoryObject);
			} catch (SdkException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			databaseObjectList.add(directoryObject);
		}
	}
	
	public int getListSize() {
		return this.databaseObjectList.size();
	}

	
	public void add(S o) {
		this.databaseObjectList.add(o);
	}

	
	public S getSingleDatabaseObject(int index) {
		return this.databaseObjectList.get(index);
	}

	
	public String getDirectoryObjectDisplayName(int index) {
		return getSingleDatabaseObject(index).getDisplayName();
	}

	
	public String getDirectoryObjectObjectId(int index) {
		return getSingleDatabaseObject(index).getObjectId();

	}
	
	@Override
	public String toString() {
		
		return databaseObjectList.toString();
		
	}

}
