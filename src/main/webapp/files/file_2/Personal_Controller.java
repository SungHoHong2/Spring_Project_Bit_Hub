package bitplace.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.json.Json;
import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.eclipse.egit.github.core.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jcabi.github.Github;
import com.jcabi.github.Repo;
import com.jcabi.github.RtGithub;
import com.jcabi.log.Logger;

import bitplace.dao.Bit_Rep;
import bitplace.vo.Bean;
import bitplace.vo.EmailTest;
import bitplace.vo.Form_data;
import bitplace.vo.Coolsms.Coolsms;
import bitplace.vo.Coolsms.SendResult;
import bitplace.vo.Coolsms.Set;

import org.apache.commons.lang3.RandomStringUtils;

import com.jcabi.github.Coordinates;
import com.jcabi.github.Github;
import com.jcabi.github.RtGithub;


@Controller
@RequestMapping("ajax/personal/{service}")
public class Personal_Controller {

@Autowired
Bit_Rep repository;

Github github;


	String[] redirects ={"groupAdminTitle_submit"
		             ,"memberChange_btn_submit"
		             ,"personal_answerInvite"
		             ,"groupChange_btn_submit"
		             ,"groupAdminTitle_delete"
		             ,"groupAdmin_deleteIndividuals"
		             ,"groupAdmin_deleteIndividuals"
	  	              };

	@ModelAttribute("data")
	public Object data(@PathVariable("service") String service,
			           HttpServletRequest request,
			           HttpSession session,
			           Bean bean,
			           Form_data fd
					   ){			
		Object res = null;		
		switch(service){
		
		/*
		 * 개발자 장윤용 
		 */
		
		case "personalInfo":
			Integer memno = (Integer)session.getAttribute("memNo");
			
			bean = (Bean)repository.getMember2(memno);
			bean.setObject1(repository.selectGroup2(memno));
			
			String photo = bean.getPhoto();
			if(photo.equals("https://avatars.githubusercontent.com/u/7775019?v=2")){
				
				res=bean;
			}else{
				String[] photoArr = {"../img/userimages/", photo};
				String userPhoto = concatenate(photoArr);
				System.out.println(userPhoto);
				bean.setPhoto(userPhoto);
				res=bean;
			}
		break;
		
		case "followerWithdraw" :
			bean.setGroupno(Integer.parseInt(request.getParameter("groupno")));
			Integer memNo=(Integer)(session.getAttribute("memNo"));
			bean.setMemno(memNo);
			
			System.out.println(bean.getGroupno());
			System.out.println(bean.getMemno());
			
			repository.groupWithdraw2(bean);
			
			res="success";
			
		break;
		
		case "leaderWithdraw" :
			bean.setGroupno(Integer.parseInt(request.getParameter("groupno")));
			repository.groupMembersWithdraw2(bean);
			repository.groupDelete2(bean);
			
			res="success";
			
		break;
		
		case "alarmChecked" :
			bean.setGroupno(Integer.parseInt(request.getParameter("groupno")));
			bean.setAlarm(Boolean.parseBoolean(request.getParameter("alarm")));
			Integer memNo2=(Integer)(session.getAttribute("memNo"));
			bean.setMemno(memNo2);
			
			System.out.println(bean.isAlarm());
			
			repository.alarmChecked2(bean);
			
			res="success";
			
		break;
	
		/*
		 * 개발자 장윤용 끝 
		 */
		
		
		/*
		 * 개발자 홍성호
		 */
		
		case "groupAdmin" :			
			boolean chkLogged = Boolean.parseBoolean(request.getParameter("sessionGo"));
			if(chkLogged==true){
				bean.setGroupno((Integer)session.getAttribute("FirstGroup"));
			}else{			
				bean.setGroupno(Integer.parseInt(request.getParameter("groupNo")));
			}			
				bean.setObject1(repository.getGroupAdmin(bean.getGroupno()));
				bean.setObject2(repository.getGroupAdminTitle(bean.getGroupno()));
				bean.setTotalPage(repository.getGroupAdminTitleTotal(bean.getGroupno()));
			    res = bean;							
		break;
		
		case "groupAdminTitle_submit" :				
				String deletelist = request.getParameter("deletelist");
				
				String[] lists = deletelist.split(",");
			
				System.out.println("groupAdminTitle_submit_output : "+lists.length);	
				System.out.println("groupAdminTitle_submit_output : "+lists[0]);	

				
				if(lists[0]!=""){
					System.out.println("groupAdminTitle_submit_output_success : "+lists[0]);
					for(int i=0; i<lists.length; i++){
						System.out.println("groupAdminTitle_submit_output : "+lists[i]);	

						 //bring the delete list from mysql
						 //using Parameter : titleno
						ArrayList<Bean> deletelists 
						= (ArrayList<Bean>)(repository.getDeleteDetailList(Integer.parseInt(lists[i])));
						
						for(Bean beanz : deletelists){
						
						// Delete the contents and GitHub Repository of specific titleno 
						// using Parameter : contentno, git_id, git_pwd
												
						// Using Github API 
						try {
						if(!beanz.getGit_repository().equals("none")){
							github = new RtGithub(beanz.getGit_id(),beanz.getGit_pwd());
							Coordinates.Simple repositoryToBeRemoved = new Coordinates.Simple(beanz.getGit_id(),beanz.getGit_repository());
							github.repos().remove(repositoryToBeRemoved);
						}
					    } catch (IOException e) {}	
						
						//Remove Content data related to specific title from the DB 
						repository.getDeleteSpecific(beanz.getContentno());
						repository.getDeleteContentno(beanz.getContentno());
						}						
						
						//Remove data from the title table 
						repository.getDeleteTitleno(Integer.parseInt(lists[i]));
						github = null;
					}
				}			 	
				
			    if(fd.getList()!=null){
				for(Bean beanz : fd.getList()){
					repository.groupAdminTitle_submit(beanz);
				}
			    }
				
				if(fd.getList2()!=null){
				for(Bean beanz : fd.getList2()){
					beanz.setGroupno(bean.getGroupno());
					repository.groupAdminTitle_add(beanz);
					repository.groupAdminTitle_order(beanz.getTitleno());
				}
				}
				
				res=bean.getGroupno();
			break;
			
		case "groupAdmin_deleteIndividuals" :
				System.out.println("groupAdmin_deleteIndividuals_output : "+bean.getContentno());
				bean = (Bean)repository.getDeleteContentData(bean.getContentno());
				System.out.println("groupAdmin_deleteIndividuals_output : "+bean.getContentno()+" "+bean.getGit_id()+" "+bean.getGit_pwd()+" "+bean.getGit_repository());
				
				repository.getDeleteSpecific(bean.getContentno());
				repository.getDeleteContentno(bean.getContentno());
				
				try {
					if(!bean.getGit_repository().equals("none")){
						github = new RtGithub(bean.getGit_id(),bean.getGit_pwd());
						Coordinates.Simple repositoryToBeRemoved = new Coordinates.Simple(bean.getGit_id(),bean.getGit_repository());
						github.repos().remove(repositoryToBeRemoved);
					}
				} catch (IOException e) {}	
		break;
			
		case "box" :
			System.out.println("box_activated");
		break;		
		
		case "groupAdmin_displayContent" :
			 res = repository.groupAdmin_displayContent(Integer.parseInt(request.getParameter("titleno")));			
		break;
		
		case "groupAdmin_searchUsers" :
			 String name ="%";
			 name+=request.getParameter("name");
			 name+="%";
			 System.out.println("groupAdmin_searchUsers_output : "+name);
			 res = repository.groupAdmin_searchUsers(request.getParameter("name"));
		break;
		
		case "groupAdmin_memDataValidation" :
			 	   bean.setEmail(request.getParameter("email"));
			 	   bean.setMemno((Integer)repository.groupAdmin_memDataValidation(request.getParameter("email")));
			 	   bean.setCount(Integer.parseInt(request.getParameter("count")));
			 res = bean;
		break;
		
		case "memberChange_btn_submit":
			  for(Bean beanz : fd.getList()){
				  beanz.setGroupno(bean.getGroupno());
				  beanz.setInviterno(bean.getMemno());
				  repository.memberChange_btn_submit(beanz);
			  }
			  res=bean.getGroupno();			  
		break;
		
		case "personal_groupInvited" :
			  System.out.println("personal_groupInvited_output : "+session.getAttribute("memNo"));
			  res = repository.personal_groupInvited((Integer)session.getAttribute("memNo"));
		break;
		
		case "personal_answerInvite":
			  System.out.println("personal_answerInvite_output : "+
		      request.getParameter("invitno")+
		      " : "+request.getParameter("memno")+
		      " : "+request.getParameter("groupno"));	
			  
			  Bean beanz = new Bean();
			  beanz.setMemno(Integer.parseInt(request.getParameter("memno")));
			  beanz.setGroupno(Integer.parseInt(request.getParameter("groupno")));
			  beanz.setInvitno(Integer.parseInt(request.getParameter("invitno")));
			  repository.personal_answerInvite(beanz);
			  repository.personal_groupInvited_delete(beanz.getInvitno());
	    break;		
	    
		case "groupChange_btn_submit" :
			  System.out.println("groupChange_btn_submit_output : "+bean.getGroupno());
			  repository.groupChange_btn_submit(bean);
			  res=bean.getGroupno(); 
		break;
		
		
		/*
		 * 개발자 홍성호 끝 
		 */
		}
		return res;
	}
	
	
	/*
	 * 개발자 장윤용 
	 */
	
	public static String concatenate(String[] str){
		String result = new String();
		for (int i = 0; i < str.length; i++) {
			result = result.concat(str[i]);
		}      
		return result;
	}
	
	/*
	 * 개발자 장윤용 끝 
	 */
	
	
	@RequestMapping
	String view(@PathVariable("service") String service){
		for(String redirect : redirects){
			if(redirect.equals(service)){
				return "/main/personal/groupAdmin_submit";
			}
		}		
		return "/main/personal/"+service;
	}	
}
