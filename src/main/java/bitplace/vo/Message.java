package bitplace.vo;

import java.io.Serializable;

public class Message implements Serializable {

	private static final long serialVersionUID = -4093981756240899937L;
	private String folder;
	private String filename;
	
	public Message() {
		super();
	}

	public String getFolder() {
		return folder;
	}

	public void setFolder(String folder) {
		this.folder = folder;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}