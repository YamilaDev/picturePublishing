package com.picturePublishing.picturePublishing.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import com.picturePublishing.picturePublishing.model.FileInfo;

public interface IFileInfoService {

	List<FileInfo> findFilesByStatus(String status) throws IOException;

	void save(MultipartFile file, String category, String description);

	Optional<FileInfo> fileById(Long id);

	byte[] getImage(Long id) throws IOException;

	MediaType getImageMediaType(Long id) throws IOException;

}
