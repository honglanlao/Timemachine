package com.microsoft.windowsazure.activedirectory.sample.timemachine.dao;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;

import com.microsoft.azure.activedirectory.sampleapp.exceptions.SampleAppException;
import com.microsoft.azure.activedirectory.sampleapp.helper.JSONHelper;

/**
 * The class UserList holds the data of a page of users. It also contains information whether
 * this page any next page or previous page and also the contains the page number member.
 * @author Azure Active Directory Contributor
 * @param <T>
 */
public class UserDaoList extends DatabaseObjectList<UserDao> {
	
	List<UserDao> userDaoList = new ArrayList<UserDao>();
	/**
	 * The constructor of the UserList class. Initializes the user List.
	 */
	public UserDaoList(){
		userDaoList = new ArrayList<UserDao>();
	}
	
	public UserDaoList(JSONArray array) throws SampleAppException{
		userDaoList = new ArrayList<UserDao>();
		for(int i = 0; i < array.length(); i++){
			UserDao user = new UserDao();
			try {
				JSONHelper.convertJSONObjectToDirectoryObject(array.optJSONObject(i), user);
			} catch (SampleAppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			userDaoList.add(user);
		}
	}
	
	/**
	 * @param index The index of the requested user.
	 * @return Returns the UserPrincipalName of the user at index position in the List.
	 */
	public String getUserPrincipalName(int index){
		return this.userDaoList.get(index).getUserPrincipalName();
	}



//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getListSize()
//	 */
//	@Override
//	public int getListSize() {
//		return this.users.size();
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#add(java.lang.Object)
//	 */
//	@Override
//	public void add(User user) {
//		this.users.add(user);
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getDirectoryObject(int)
//	 */
//	@Override
//	public User getSingleDirectoryObject(int index) {
//		return this.users.get(index);
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getDirectoryObjectDisplayName(int)
//	 */
//	@Override
//	public String getDirectoryObjectDisplayName(int index) {
//		return getSingleDirectoryObject(index).getDisplayName();
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getDirectoryObjectObjectId(int)
//	 */
//	@Override
//	public String getDirectoryObjectObjectId(int index) {
//		return getSingleDirectoryObject(index).getObjectId();
//
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getDirectoryObjectObjectReference(int)
//	 */
//	@Override
//	public String getDirectoryObjectObjectReference(int index) {
//		return getSingleDirectoryObject(index).getObjectReference();
//
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getPrevSkipToken()
//	 */
//	@Override
//	public String getPrevSkipToken() {
//		return prevSkiptoken;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#setPrevSkipToken(java.lang.String)
//	 */
//	@Override
//	public void setPrevSkipToken(String prevSkipToken) {
//		this.prevSkiptoken = prevSkipToken;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getNextSkipToken()
//	 */
//	@Override
//	public String getNextSkipToken() {
//		return nextSkiptoken;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#setNextSkiptoken(java.lang.String)
//	 */
//	@Override
//	public void setNextSkiptoken(String nextSkipToken) {
//		this.nextSkiptoken = nextSkipToken;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#getCurrSkipToken()
//	 */
//	@Override
//	public String getCurrSkipToken() {
//		return currSkiptoken;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.sampleapp.models.DirectoryObjectList#setCurrSkiptoken(java.lang.String)
//	 */
//	@Override
//	public void setCurrSkiptoken(String currSkipToken) {
//		this.currSkiptoken = currSkipToken;
//	}
		
}
