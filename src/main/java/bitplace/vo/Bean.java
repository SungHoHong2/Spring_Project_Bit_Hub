package bitplace.vo;

import java.io.File;
import java.io.Serializable;
import java.util.Date;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

@Alias("bean")
public class Bean implements Serializable{
	private static final long serialVersionUID = 1L;
	Integer memno;
	String gitid, email, photo, email_serial, phone;
	Object object1;
	Object object2;
	Object object3;

	String code;
	
	MultipartFile photoUpfile;
	
	String pwd;
	boolean admin;
	String groupname, title;	
			
	String content_title, content;
	String newcontent;
	
	Date edited_date;
	int titleno;

	String pathBefore;
	
	String pageUrl;
	
	Integer groupno;
	
	Date created_date;
	
	Integer contentno;
	
	String content_leader;

	String git_repository, git_id, git_pwd;
	
	Integer activegroup;
	
	String sha, path, type;	
	
	String name;
	Integer creator;

	File []files;
	
	char opento;
	char openorclose;
	
	String introduce;
	
	Integer orders;
	boolean activate;
	
	char level;

	Integer startPage, prevPage;
	Integer totalPage;
	
	Integer firstPage, lastPage, nextPage;
	Integer inviterno;
	
	Integer invitno;
	char invitetype;
	
	Integer pathNum;
	Integer pathNumParent;
	
	
	String update_data;
	String commit;
	String commitsha;
	String records;
	
	//my
	String pwdConfirm;
	Date reg_date, date;
	boolean alarm, accept, today, isalarmed;
	String search, m_content, receiverno;
	Integer roomno, participants,messageno,sender,totalCount, leadno;	
	

	Integer page, beginPage, endPage;
	String pageName;
	

	Integer receiver, reqno, requester, no, startIndex, size, totalSize, pageSize;
	String updata, updata_path, writer;
	
	//my end
	
	Integer commentno;
	String real_content_title;
	
	
		
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getBeginPage() {
		return beginPage;
	}
	public void setBeginPage(Integer beginPage) {
		this.beginPage = beginPage;
	}
	public Integer getEndPage() {
		return endPage;
	}
	public void setEndPage(Integer endPage) {
		this.endPage = endPage;
	}
	public String getPageName() {
		return pageName;
	}
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
	public Integer getReceiver() {
		return receiver;
	}
	public void setReceiver(Integer receiver) {
		this.receiver = receiver;
	}
	public Integer getReqno() {
		return reqno;
	}
	public void setReqno(Integer reqno) {
		this.reqno = reqno;
	}
	public Integer getRequester() {
		return requester;
	}
	public void setRequester(Integer requester) {
		this.requester = requester;
	}
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(Integer startIndex) {
		this.startIndex = startIndex;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Integer getTotalSize() {
		return totalSize;
	}
	public void setTotalSize(Integer totalSize) {
		this.totalSize = totalSize;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public String getUpdata() {
		return updata;
	}
	public void setUpdata(String updata) {
		this.updata = updata;
	}
	public String getUpdata_path() {
		return updata_path;
	}
	public void setUpdata_path(String updata_path) {
		this.updata_path = updata_path;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getNewcontent() {
		return newcontent;
	}
	public void setNewcontent(String newcontent) {
		this.newcontent = newcontent;
	}
	public String getReal_content_title() {
		return real_content_title;
	}
	public void setReal_content_title(String real_content_title) {
		this.real_content_title = real_content_title;
	}
	public Object getObject3() {
		return object3;
	}
	public void setObject3(Object object3) {
		this.object3 = object3;
	}
	public Integer getCommentno() {
		return commentno;
	}
	public void setCommentno(Integer commentno) {
		this.commentno = commentno;
	}
	public Integer getInvitno() {
		return invitno;
	}
	public String getRecords() {
		return records;
	}
	public void setRecords(String records) {
		this.records = records;
	}
	public String getCommitsha() {
		return commitsha;
	}
	public void setCommitsha(String commitsha) {
		this.commitsha = commitsha;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCommit() {
		return commit;
	}
	public void setCommit(String commit) {
		this.commit = commit;
	}
	public String getPathBefore() {
		return pathBefore;
	}
	public void setPathBefore(String pathBefore) {
		this.pathBefore = pathBefore;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public boolean isToday() {
		return today;
	}
	public void setToday(boolean today) {
		this.today = today;
	}
	public boolean isIsalarmed() {
		return isalarmed;
	}
	public void setIsalarmed(boolean isalarmed) {
		this.isalarmed = isalarmed;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public String getM_content() {
		return m_content;
	}
	public void setM_content(String m_content) {
		this.m_content = m_content;
	}
	public String getReceiverno() {
		return receiverno;
	}
	public void setReceiverno(String receiverno) {
		this.receiverno = receiverno;
	}
	public Integer getRoomno() {
		return roomno;
	}
	public void setRoomno(Integer roomno) {
		this.roomno = roomno;
	}
	public Integer getParticipants() {
		return participants;
	}
	public void setParticipants(Integer participants) {
		this.participants = participants;
	}
	public Integer getMessageno() {
		return messageno;
	}
	public void setMessageno(Integer messageno) {
		this.messageno = messageno;
	}
	public Integer getSender() {
		return sender;
	}
	public void setSender(Integer sender) {
		this.sender = sender;
	}
	public Integer getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}
	public Integer getLeadno() {
		return leadno;
	}
	public void setLeadno(Integer leadno) {
		this.leadno = leadno;
	}
	public String getUpdate_data() {
		return update_data;
	}
	public void setUpdate_data(String update_data) {
		this.update_data = update_data;
	}
	public Integer getPathNum() {
		return pathNum;
	}
	public void setPathNum(Integer pathNum) {
		this.pathNum = pathNum;
	}
	public Integer getPathNumParent() {
		return pathNumParent;
	}
	public void setPathNumParent(Integer pathNumParent) {
		this.pathNumParent = pathNumParent;
	}
	public Integer getNextPage() {
		return nextPage;
	}
	public void setNextPage(Integer nextPage) {
		this.nextPage = nextPage;
	}
	public String getPwdConfirm() {
		return pwdConfirm;
	}
	public void setPwdConfirm(String pwdConfirm) {
		this.pwdConfirm = pwdConfirm;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public boolean isAlarm() {
		return alarm;
	}
	public void setAlarm(boolean alarm) {
		this.alarm = alarm;
	}
	public boolean isAccept() {
		return accept;
	}
	public void setAccept(boolean accept) {
		this.accept = accept;
	}
	public void setInvitno(Integer invitno) {
		this.invitno = invitno;
	}

	public char getInvitetype() {
		return invitetype;
	}
	public void setInvitetype(char invitetype) {
		this.invitetype = invitetype;
	}
	public Integer getInviterno() {
		return inviterno;
	}
	public void setInviterno(Integer inviterno) {
		this.inviterno = inviterno;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public Integer getFirstPage() {
		return firstPage;
	}
	public void setFirstPage(Integer firstPage) {
		this.firstPage = firstPage;
	}
	public Integer getLastPage() {
		return lastPage;
	}
	public void setLastPage(Integer lastPage) {
		this.lastPage = lastPage;
	}
	public Integer getPrevPage() {
		return prevPage;
	}
	public void setPrevPage(Integer prevPage) {
		this.prevPage = prevPage;
	}
	public Integer getStartPage() {
		return startPage;
	}
	public void setStartPage(Integer startPage) {
		this.startPage = startPage;
	}
	public boolean isActivate() {
		return activate;
	}
	public void setActivate(boolean activate) {
		this.activate = activate;
	}
	public Integer getActivegroup() {
		return activegroup;
	}
	public void setActivegroup(Integer activegroup) {
		this.activegroup = activegroup;
	}
	public char getLevel() {
		return level;
	}
	public void setLevel(char level) {
		this.level = level;
	}
	public Integer getOrders() {
		return orders;
	}
	public void setOrders(Integer orders) {
		this.orders = orders;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public Integer getCreator() {
		return creator;
	}
	public void setCreator(Integer creator) {
		this.creator = creator;
	}
	
	boolean locker, validation;
	Integer count;
	

	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public MultipartFile getPhotoUpfile() {
		return photoUpfile;
	}
	public void setPhotoUpfile(MultipartFile photoUpfile) {
		this.photoUpfile = photoUpfile;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public boolean isLocker() {
		return locker;
	}
	public void setLocker(boolean locker) {
		this.locker = locker;
	}
	public boolean isValidation() {
		return validation;
	}
	public void setValidation(boolean validation) {
		this.validation = validation;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public char getOpenorclose() {
		return openorclose;
	}
	public void setOpenorclose(char openorclose) {
		this.openorclose = openorclose;
	}
	public char getOpento() {
		return opento;
	}
	public void setOpento(char opento) {
		this.opento = opento;
	}
	public File[] getFiles() {
		return files;
	}
	public void setFiles(File[] files) {
		this.files = files;
	}
	public Object getObject1() {
		return object1;
	}
	public void setObject1(Object object1) {
		this.object1 = object1;
	}
	public Object getObject2() {
		return object2;
	}
	public void setObject2(Object object2) {
		this.object2 = object2;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSha() {
		return sha;
	}
	public void setSha(String sha) {
		this.sha = sha;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getGit_repository() {
		return git_repository;
	}
	public void setGit_repository(String git_repository) {
		this.git_repository = git_repository;
	}
	public String getGit_id() {
		return git_id;
	}
	public void setGit_id(String git_id) {
		this.git_id = git_id;
	}
	public String getGit_pwd() {
		return git_pwd;
	}
	public void setGit_pwd(String git_pwd) {
		this.git_pwd = git_pwd;
	}
	public String getContent_leader() {
		return content_leader;
	}
	public void setContent_leader(String content_leader) {
		this.content_leader = content_leader;
	}
	public Integer getContentno() {
		return contentno;
	}
	public void setContentno(Integer contentno) {
		this.contentno = contentno;
	}
	public Date getCreated_date() {
		return created_date;
	}
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
	public Integer getGroupno() {
		return groupno;
	}
	public void setGroupno(Integer groupno) {
		this.groupno = groupno;
	}
	public String getPageUrl() {
		return pageUrl;
	}
	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}
	public Date getEdited_date() {
		return edited_date;
	}
	public void setEdited_date(Date edited_date) {
		this.edited_date = edited_date;
	}
	public String getContent_title() {
		if(content_title.length()>15){
		this.content_title = content_title.substring(0,15);
		this.content_title+="...";
		}
		return content_title;
	}
	public void setContent_title(String content_title) {
		this.content_title = content_title;
	}
	public int getTitleno() {
		return titleno;
	}
	public void setTitleno(int titleno) {
		this.titleno = titleno;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public Integer getMemno() {
		return memno;
	}
	public void setMemno(Integer memno) {
		this.memno = memno;
	}
	public String getGitid() {
		return gitid;
	}
	public void setGitid(String gitid) {
		this.gitid = gitid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getEmail_serial() {
		return email_serial;
	}
	public void setEmail_serial(String email_serial) {
		this.email_serial = email_serial;
	}
	public boolean isAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}	
}