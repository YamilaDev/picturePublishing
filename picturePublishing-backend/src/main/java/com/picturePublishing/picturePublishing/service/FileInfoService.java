package com.picturePublishing.picturePublishing.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.picturePublishing.picturePublishing.constants.Constants;
import com.picturePublishing.picturePublishing.model.FileInfo;
import com.picturePublishing.picturePublishing.repository.FileInfoRepository;
import com.picturePublishing.picturePublishing.utils.FileUtils;

@Service
public class FileInfoService implements IFileInfoService {
	@Autowired
	private FileInfoRepository fileRepository;

	@Override
	public List<FileInfo> findFilesByStatus(String status) throws IOException {
		return fileRepository.findFilesByStatus(status);
	}

	@Override
	public void save(MultipartFile file, String category, String description) {
		try {
			FileInfo fileinfo = new FileInfo(file.getOriginalFilename(), file.getContentType(), file.getBytes(),
					category, description, file.getSize(), Constants.FILE_STATUS_PENDING); 
			String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/images/")
					.toUriString();
			fileinfo.setFileUrl(fileUri); 
			fileRepository.save(fileinfo);
			
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public void acceptFile(Long id) {
		try {
			Optional<FileInfo> fileinfoOptional = fileById(id);
			if (fileRepository.existsById(id)) {
				FileInfo fileinfo = fileinfoOptional.get();
				fileinfo.setStatus(Constants.FILE_STATUS_ACCEPTED);
				String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/images/")
						.toUriString();
				fileinfo.setFileUrl(fileUri);
				fileRepository.save(fileinfo);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public void rejectFile(Long id) {
		try {
			Optional<FileInfo> fileinfoOptional = fileById(id);
			if (fileRepository.existsById(id)) {
				FileInfo fileinfo = fileinfoOptional.get();
				fileinfo.setFileData(null);
				fileinfo.setFileUrl(null);
				fileinfo.setStatus(Constants.FILE_STATUS_REJECTED);
				fileRepository.save(fileinfo);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public Optional<FileInfo> fileById(Long id) {
		return fileRepository.findById(id);

	}

	@Override
	public byte[] getImage(Long id) throws IOException {
		FileInfo fileInfo = fileById(id).get();
		return FileUtils.getImageBytes(fileInfo.getFileData(), fileInfo.getFileName());
	}

	@Override
	public MediaType getImageMediaType(Long id) throws IOException {
		FileInfo fileInfo = fileById(id).get();
		return FileUtils.getMediaType(fileInfo.getFileType());

	}

}