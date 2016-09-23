package bitplace.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bitplace.vo.Bean;

@Repository
public class Bit_Rep {

@Autowired
SqlSessionFactory sqlSessionFactory;

public Object getGroups(Integer no) throws Exception{
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
			return sqlSession.selectList("bean-mapper.group",no);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getTitles(Integer group) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	
	try{
	return sqlSession.selectList("bean-mapper.title",group);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}


public Object getTitlefirstOrder(Integer groupno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
	return sqlSession.selectOne("bean-mapper.getTitlefirstOrder",groupno);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}


public Object getTitlelastOrder(Integer groupno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
	return sqlSession.selectOne("bean-mapper.getTitlelastOrder",groupno);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}


public Object getTitlesPaging(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	
	System.out.println("RepogetTitlesPaging : "+bean.getStartPage()+" : "+bean.getPrevPage());
	try{
		return sqlSession.selectList("bean-mapper.getTitlesPaging",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getTitlesPagingRe(Bean bean) {
	// TODO Auto-generated method stu
	SqlSession sqlSession = sqlSessionFactory.openSession();
	
	System.out.println("RepogetTitlesPagingRe : "+bean.getStartPage()+" : "+bean.getPrevPage());
	try{
		return sqlSession.selectList("bean-mapper.getTitlesPagingRev",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}


/*
 * Sub.jsp Repository
 */

public Object getSubs(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.sub",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getSubDate(Bean bean){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.subDate",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getSubLeader(Bean bean){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.subLeader",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getSubFollower(Bean bean){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.subFollower",bean);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getSubsTotal(Integer groupno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getSubsTotal",groupno);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object getSubsMax(Integer groupNo) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getSubsMax",groupNo);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public Object getSubsMin(Integer groupNo) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getSubsMin",groupNo);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public Object getSubPaging(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getSubPaging",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}


public Object getprevSubPaging(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getprevSubPaging",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

/*
 * Sub.jsp Repository End
 */



public Object selectedGroup(Integer group) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.selectedGroup",group);
	}catch(Exception e){
		throw e;
	}finally{
		sqlSession.close();
	}
}

public Object firstLogin(Integer no) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.firstLogin", no);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object getContent(Integer contentno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.contentDisplay", contentno);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object getContentfromOneTitle(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	System.out.println("Bit_Rep : "+bean);
	try{
		return sqlSession.selectList("bean-mapper.contentDisplaybyTitle", bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object submitPost(Bean bean) {
	
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.submitPost", bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}	
	return null;
}

public Object inputSubmitPost(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.inputSubmitPost", bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}	
	return null;	
}

public Object inputSubmitPost2(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.inputSubmitPost2", bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}	
	return null;		
}

public Object getDisplayContent(Integer contentno){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getDisplayContent", contentno);
	}catch(Exception e){
		System.out.println(e.getMessage());
	}
	finally{
		sqlSession.close();
	}
	return null;
}


public Object getComments(Integer contentno){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getComments", contentno);
	}catch(Exception e){
		System.out.println(e.getMessage());
	}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object updateContent(Bean bean){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.updateContent", bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}	
	return null;		
}


public Object getMemLevel(Bean bean){
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getMemLevel",bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;}


public Object getLogged(Integer memno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.logged",memno);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object checkIdValdation(String searchValue) {
	
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.checkIdValdation",searchValue);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object loginBtn(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.loginBtn",bean);
	}catch(Exception e){}
	finally{
		sqlSession.close();
	}
	return null;	
}


public Object getRegisterSubmit(Bean bean) {

	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.getRegisterSubmit",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}
	return null;	
}

public Object getFindName(String name) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getFindName",name);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object getFindBtn(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getFindBtn",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}
	return null;
}

public Object getSearchGroup(String search) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getSearchGroup",search);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;
}


public Object getMyGroup(Integer memno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getMyGroup",memno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;
}

public Object getSearchGroupDetail(Integer groupNo) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getSearchGroupDetail",groupNo);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;

}

public Object getInsertGroup(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.getInsertGroup",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;
}

public Object getRegGroupMember(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.getRegGroupMember",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object getGroupAdmin(Integer groupno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getGroupAdmin",groupno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object getGroupAdminTitle(Integer groupno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getGroupAdminTitle",groupno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;
}

public Object groupAdminTitle_submit(Bean bean) {
	System.out.println("groupAdminTitle_submit_rep : "+bean.getTitle()+" "+bean.getTitleno());
	
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.update("bean-mapper.groupAdminTitle_submit",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer getCreatorValue(Integer groupNo) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getCreatorValue",groupNo);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer groupAdminTitle_add(Bean beanz) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.groupAdminTitle_add",beanz);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer groupAdminTitle_order(Integer titleno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.groupAdminTitle_order",titleno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer getGroupAdminTitleTotal(Integer groupno) {
	// TODO Auto-generated method stub
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getGroupAdminTitleTotal",groupno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object groupAdmin_displayContent(Integer titleno) {
	// TODO Auto-generated method stub
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.groupAdmin_displayContent",titleno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object groupAdmin_searchUsers(String name) {
	// TODO Auto-generated method stub
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.groupAdmin_searchUsers",name);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object groupAdmin_memDataValidation(String email) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.groupAdmin_memDataValidation",email);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer memberChange_btn_submit(Bean bean) {
	// TODO Auto-generated method stub
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.memberChange_btn_submit",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Object personal_groupInvited(Integer memno) {
	// TODO Auto-generated method stub
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.personal_groupInvited",memno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}

public Integer personal_answerInvite(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.insert("bean-mapper.personal_answerInvite",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public Integer personal_groupInvited_delete(Integer invitno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.delete("bean-mapper.personal_groupInvited_delete",invitno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public Integer groupChange_btn_submit(Bean bean) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.update("bean-mapper.groupChange_btn_submit",bean);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public Object getDeleteDetailList(Integer titleno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectList("bean-mapper.getDeleteDetailList",titleno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;		
}

public void getDeleteSpecific(Integer contentno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		 sqlSession.delete("bean-mapper.getDeleteSpecific",contentno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}
}


public void getDeleteContentno(Integer contentno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		 sqlSession.delete("bean-mapper.getDeleteContentno",contentno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}
}

public Object getDeleteContentData(Integer contentno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		return sqlSession.selectOne("bean-mapper.getDeleteContentData",contentno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	return null;	
}


public void getDeleteTitleno(Integer titleno) {
	SqlSession sqlSession = sqlSessionFactory.openSession();
	try{
		 sqlSession.delete("bean-mapper.getDeleteTitleno",titleno);
	}catch(Exception e){ 
		System.out.println(e.getMessage());}
	finally{
		sqlSession.close();
	}	
}




/*
 * 개발자 장윤용 
 */

public Object getMessageForAlarm(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMessageForAlarm", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getIsAlarmed(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getIsAlarmed", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getGroupAlarm(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getGroupAlarm", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void updateIsAlarmed(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.update("bean-mapper.updateIsAlarmed", memno);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}


public Object getMember(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMember", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void pwdUpdate(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();

try{
	sqlSession.update("bean-mapper.pwdUpdate", bean);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}

public void emailUpdate(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();

try{
	sqlSession.update("bean-mapper.emailUpdate", bean);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}

public void phoneUpdate(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();

try{
	sqlSession.update("bean-mapper.phoneUpdate", bean);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}

public void photoUpdate(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();

try{
	sqlSession.update("bean-mapper.photoUpdate", bean);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}

public void alarmUpdate(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();

try{
	sqlSession.update("bean-mapper.alarmUpdate", bean);
	sqlSession.commit();
}catch(Exception e){
	sqlSession.rollback();
	throw e;
}finally{
	sqlSession.close();
}
}

public List<Bean> selectGroup(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.selectGroup",memno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

/*public void deleteCommentsByFollower(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteCommentsByFollower", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}
*/


public void groupWithdraw(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.groupWithdraw", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteInvitation(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteInvitation", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteComments(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteComments", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getContentno(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getContentno", groupno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void deleteContentSpecific(Integer contentno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteContentSpecific", contentno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteReadOrNot(Integer contentno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteReadOrNot", contentno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getTitleno(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getTitleno", groupno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void deleteContent(Integer titleno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteContent", titleno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteTitleOrder(Integer titleno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteTitleOrder", titleno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteTitle(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteTitle", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getLeadno(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getLeadno", groupno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void deleteAnnounce(Integer leadno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteAnnounce", leadno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteData(Integer leadno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteData", leadno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteLeaderWrite(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.deleteLeaderWrite", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}


public void groupMembersWithdraw(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.groupMembersWithdraw", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void groupDelete(Integer groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.groupDelete", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void alarmChecked(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	 sqlSession.delete("bean-mapper.alarmChecked", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public List<Bean> receiverSearch(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.receiverSearch", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getGroupname(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getGroupname", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getGroupMembersName(Bean groupno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getGroupMembersName", groupno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Bean getMaxRoomno() {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMaxRoomno");
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void createRoom(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.createRoom", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void participateRoom(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.participateRoom", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void sendMessage(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.sendMessage", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Bean getMessageno(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMessageno", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getParticipants(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getParticipants", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void readMessage (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.readMessage", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void messageIsAlarmed (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.messageIsAlarmed", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getMessage(Integer roomno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getMessage", roomno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getReplyMessage(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getReplyMessage", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getReceiver(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getReceiver", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getRoomno(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getRoomno", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getReceiverForTitle(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getReceiverForTitle", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getLastMessage(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getLastMessage", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getReadCount(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getReadCount", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMessageCount(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMessageCount", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMaxMessageno(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMaxMessageno", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMessagenos(Integer roomno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getMessagenos", roomno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMessagenosFromLast(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getMessagenosFromLast", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMessageDate(Integer roomno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getMessageDate", roomno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getMaxMessageDate(Integer roomno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getMaxMessageDate", roomno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}



public void sendInvitation (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.sendInvitation", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getInvitation(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getInvitation", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object isJoinedGroup(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.isJoinedGroup", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object isJoinedGroup2(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.isJoinedGroup2", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void followerAccept (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.followerAccept", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void leaderAccept (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.update("bean-mapper.leaderAccept", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteGetInvitation (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.delete("bean-mapper.deleteGetInvitation", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void sendJoinRequest (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.sendJoinRequest", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getJoinRequest(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getJoinRequest", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void requestAccept (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.requestAccept", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void deleteGetRequest (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.delete("bean-mapper.deleteGetRequest", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getInvitationForAlarm(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getInvitationForAlarm", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getJoinRequestForAlarm(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getJoinRequestForAlarm", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void invitationIsAlaremd (Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.update("bean-mapper.invitationIsAlaremd", memno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void joinRequestIsAlaremd (Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.update("bean-mapper.joinRequestIsAlaremd", memno);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getGroupFromRequest(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getGroupFromRequest", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getleaderWriteNo(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getleaderWriteNo", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}


public void insertleaderWrite (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.insertleaderWrite", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public void insertData (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.insertData", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object countAllAnnounce(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.countAllAnnounce", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getAnnounce(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getAnnounce", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object countAnnounceRead(Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.countAnnounceRead", bean);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getAnnounceRead(Integer memno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getAnnounceRead", memno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public void insertAnnounceRead (Bean bean) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	sqlSession.insert("bean-mapper.insertAnnounceRead", bean);
}catch(Exception e){
	throw e;
}finally{
	sqlSession.close();
}
}

public Object getAnnounceDetail(Integer leadno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectOne("bean-mapper.getAnnounceDetail", leadno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}

public Object getData(Integer leadno) {
SqlSession sqlSession = sqlSessionFactory.openSession();
try{
	return sqlSession.selectList("bean-mapper.getData", leadno);
}catch(Exception e){ 
	System.out.println(e.getMessage());}
finally{
	sqlSession.close();
}	return null;	
}


/*
 * 개발자 장윤용 끝 
 */







}