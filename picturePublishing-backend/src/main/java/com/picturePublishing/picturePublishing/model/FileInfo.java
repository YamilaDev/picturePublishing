package com.picturePublishing.picturePublishing.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "FILES_INFO")

public class FileInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FILE_NAME", nullable = false, length = 30)
	private String fileName;

	@Column(name = "FILE_URL")
	private String fileUrl;

	@Column(name = "STATUS", nullable = false)
	private String status;

	@Column(name = "DESCRIPTION", nullable = false)
	private String description;

	@Column(name = "CATEGORY", nullable = false)
	private String category;

	@Lob
	@Column(name = "FILE_DATA")
	private byte[] fileData;

	@Column(name = "FILE_TYPE", nullable = false)
	private String fileType;

	@Column(name = "FILE_SIZE", nullable = false)
	private long fileSize;

	public FileInfo() {
	}

	public FileInfo(String fileName, String fileType, byte[] fileData, String category, String description,
			long fileSize, String fileStatus) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileData = fileData;
		this.category = category;
		this.description = description;
		this.status = fileStatus;
		this.fileSize = fileSize;

	}

	public Long getId() {
		return id;
	}

	public String getFileName() {
		return fileName;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public String getStatus() {
		return status;
	}

	public String getDescription() {
		return description;
	}

	public String getCategory() {
		return category;
	}

	public byte[] getFileData() {
		return fileData;
	}

	public String getFileType() {
		return fileType;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

}
