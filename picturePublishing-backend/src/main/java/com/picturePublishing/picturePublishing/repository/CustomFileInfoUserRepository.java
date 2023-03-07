package com.picturePublishing.picturePublishing.repository;

import java.util.List;

import com.picturePublishing.picturePublishing.model.FileInfo;

public interface CustomFileInfoUserRepository {

	List<FileInfo> findFilesByStatus(String status);
	
}