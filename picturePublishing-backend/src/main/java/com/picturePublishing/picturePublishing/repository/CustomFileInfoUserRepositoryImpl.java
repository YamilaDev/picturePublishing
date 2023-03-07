package com.picturePublishing.picturePublishing.repository;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.util.SerializationUtils;

import com.picturePublishing.picturePublishing.model.FileInfo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomFileInfoUserRepositoryImpl implements CustomFileInfoUserRepository {
	@PersistenceContext
	private EntityManager entityManager;

	public List<FileInfo> findFilesByStatus(String status) {
		List<Object[]> list = entityManager.createNativeQuery("""
				SELECT f.id , f.category , f.description , f.file_data ,  f.file_name , f.file_type ,
				 f.file_url , f.file_size ,  f.status FROM files_info f WHERE f.status in (:status)
				""").setParameter("status", status).getResultList();

		List<FileInfo> files = new ArrayList<FileInfo>();
		for (Object[] objecs : list) {
			FileInfo fileInfo = new FileInfo();
			fileInfo.setId(convertToLong(objecs[0]));
			fileInfo.setCategory(objecs[1].toString());
			fileInfo.setDescription(objecs[2].toString());
			if (null != objecs[3]) {  
				fileInfo.setFileData(objecs[3].toString().getBytes());
			}
			fileInfo.setFileName(objecs[4].toString());
			if (null != objecs[5]) {
				fileInfo.setFileType(objecs[5].toString());
			}

			if (null != objecs[6]) {
				fileInfo.setFileUrl(objecs[6].toString());
			}
			if (null != objecs[7]) {
				fileInfo.setFileSize(convertToLong(objecs[0]).longValue());
			}
			fileInfo.setStatus(status.toUpperCase());
			files.add(fileInfo);
		}
		return files;
	}

	public static Long convertToLong(Object o) {
		String stringToConvert = String.valueOf(o);
		Long convertedLong = Long.parseLong(stringToConvert);
		return convertedLong;

	}
}
