package com.microsoft.windowsazure.activedirectory.sample.timemachine.dao;

import javax.xml.bind.annotation.XmlRootElement;

import com.google.gson.Gson;



/**
 *  The User Class holds together all the members of a WAAD User entity and all the access methods and set methods
 *  @author Azure Active Directory Contributor
 */
@XmlRootElement
public class UserDao extends DatabaseObject{
	
	// The following are the individual private members of a User object that holds
	// a particular simple attribute of an User object.
	protected String ObjectId;
	protected String UserPrincipalName;
	protected String DisplayName;
	protected String GivenName;
	protected String Surname;
	protected boolean IsHrAdmin;
	protected int VacationBalance;
	protected int CustomAccrualRate;
	protected int SickLeaveBalance;
	protected int CarriedOverVacation;
	
	/**
	 * The constructor for the User class. Initializes the dynamic lists and manager variables.
	 */
	public UserDao(){
	//	manager = null;
	}
	
	public UserDao(String displayName, String objectId){
		setDisplayName(displayName);
		setObjectId(objectId);
	}
	
	public UserDao(String objectId, String upn, String displayName, String givenName, String surName, boolean isHrAdmin,
			       int customAccrualRate, int sickLeaveBalance, int carriedOverVacation){
		
		setObjectId(objectId);
		setUserPrincipalName(upn);
		setDisplayName(displayName);
		setGivenName(givenName);
		setSurname(surName);
		setIsHrAdmin(isHrAdmin);
		setCustomAccrualRate(customAccrualRate);
		setSickLeaveBalance(sickLeaveBalance);
		setCarriedOverVacation(carriedOverVacation);
	}	
	
	/**
	 * @return The objectId of this user.
	 */
	public String getObjectId() {
		return ObjectId;
	}
	
	/**
	 * @param objectId The objectId to set to this User object.
	 */
	public void setObjectId(String objectId) {
		ObjectId = objectId;
	}

	public String getUserPrincipalName() {
		return UserPrincipalName;
	}

	public void setUserPrincipalName(String upn) {
		UserPrincipalName = upn;
	}

	/**
	 * @return The surname of this User.
	 */
	public String getSurname() {
		return Surname;
	}

	/**
	 * @param surname The surname to set to this User Object.
	 */
	public void setSurname(String surname) {
		Surname = surname;
	}

	/**
	 * @return The givenName of this User.
	 */
	public String getGivenName() {
		return GivenName;
	}

	/**
	 * @param givenName The givenName to set to this User.
	 */
	public void setGivenName(String givenName) {
		GivenName = givenName;
	}

	/**
	 * @return The displayName of this User.
	 */
	public String getDisplayName() {
		return DisplayName;
	}

	/**
	 * @param displayName The displayName to set to this User Object.
	 */
	public void setDisplayName(String displayName) {
		DisplayName = displayName;
	}

	public boolean isIsHrAdmin() {
		return IsHrAdmin;
	}

	public void setIsHrAdmin(boolean isHrAdmin) {
		IsHrAdmin = isHrAdmin;
	}

	public int getVacationBalance() {
		return VacationBalance;
	}

	public int getCustomAccrualRate() {
		return CustomAccrualRate;
	}

	public int getSickLeaveBalance() {
		return SickLeaveBalance;
	}

	public int getCarriedOverVacation() {
		return CarriedOverVacation;
	}

	public void setVacationBalance(int vacationBalance) {
		this.VacationBalance = vacationBalance;
	}

	public void setCustomAccrualRate(int customAccrualRate) {
		this.CustomAccrualRate = customAccrualRate;
	}

	public void setSickLeaveBalance(int sickLeaveBalance) {
		this.SickLeaveBalance = sickLeaveBalance;
	}

	public void setCarriedOverVacation(int carriedOverVacation) {
		this.CarriedOverVacation = carriedOverVacation;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

	/* (non-Javadoc)
	 * @see com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.DatabaseObject#getObjectType()
	 */
	@Override
	public String getObjectType() {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see com.microsoft.windowsazure.activedirectory.sample.timemachine.dao.DatabaseObject#setObjectType(java.lang.String)
	 */
	@Override
	public void setObjectType(String objectType) {
		// TODO Auto-generated method stub
		
	}

}


/**
 * The Class DirectReports Holds the essential data for a single DirectReport entry. Namely,
 * it holds the displayName and the objectId of the direct entry. Furthermore, it provides the
 * access methods to set or get the displayName and the ObjectId of this entry.
 */
class DirectReportDao extends UserDao{

	private String displayName;
	private String objectId;
	 
	/**
	 * Two arguments Constructor for the DirectReport Class.
	 * @param displayName
	 * @param objectId
	 */
	public DirectReportDao(String displayName, String objectId){
		this.displayName = displayName;
		this.objectId = objectId;
	}

	/**
	 * @return The diaplayName of this direct report entry.
	 */
	public String getDisplayName() {
		return displayName;
	}

	
	/**
	 *  @return The objectId of this direct report entry. 
	 */
	public String getObjectId() {
		return objectId;
	}

}



