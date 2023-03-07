package com.picturePublishing.picturePublishing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.picturePublishing.picturePublishing.model.FileInfo;

@Repository
public interface FileInfoRepository extends JpaRepository<FileInfo, Long>, CustomFileInfoUserRepository {

}