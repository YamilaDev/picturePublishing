package com.picturePublishing.picturePublishing.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.picturePublishing.picturePublishing.constants.Constants;
import com.picturePublishing.picturePublishing.model.FileInfo;
import com.picturePublishing.picturePublishing.service.FileInfoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/files")
public class FileInfoController {

	@Autowired
	FileInfoService fileInfoService;

	@PostMapping(path = "/uploadFile")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
			@RequestParam("category") String category, @RequestParam("description") String description)
			throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		if (file.getContentType().equals(MediaType.IMAGE_JPEG_VALUE)
				|| file.getContentType().equals(MediaType.IMAGE_PNG_VALUE)
				|| file.getContentType().equals(MediaType.IMAGE_GIF_VALUE)) {

			try {

				fileInfoService.save(file, category, description);
				map.put("status", 0);
				map.put("message", "File saved");
				return new ResponseEntity<>(map, HttpStatus.OK);
			} catch (Exception e) {
				map.clear();
				map.put("status", 1);
				map.put("message", e.getMessage());
				return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			map.put("status", 1);
			map.put("message", "File is not valid");
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping(path = "/acceptFile")
	public ResponseEntity<?> acceptFile(@RequestBody FileInfo fileInfo) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		try {
			fileInfoService.acceptFile(fileInfo.getId());
			map.put("status", 0);
			map.put("message", "File accepted");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("status", 1);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping(path = "/rejectFile")
	public ResponseEntity<?> rejectFile(@RequestBody FileInfo fileInfo) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		try {
			fileInfoService.rejectFile(fileInfo.getId());
			map.put("status", 0);
			map.put("message", "File rejected");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("status", 1);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(path = "/findFilesByStatus/{status}")
	public ResponseEntity<?> findFilesByStatus(@PathVariable String status) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			if (null != status && !status.isEmpty() && status.equalsIgnoreCase(Constants.FILE_STATUS_PENDING)
					|| status.equalsIgnoreCase(Constants.FILE_STATUS_REJECTED)
					|| status.equalsIgnoreCase(Constants.FILE_STATUS_ACCEPTED)) {
				List<FileInfo> files = fileInfoService.findFilesByStatus(status.toUpperCase());
				map.put("status", 0);
				map.put("data", files);
				return new ResponseEntity<>(map, HttpStatus.OK);
			} else {
				map.put("status", 2);
				map.put("message", "Invalid Paramenter");
				return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} catch (Exception e) {
			map.clear();
			map.put("status", 1);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/images/{id}/{fileName}")
	@ResponseBody
	public ResponseEntity<?> getImageById(@PathVariable Long id, @PathVariable String fileName) throws IOException {
		byte[] bytes = fileInfoService.getImage(id);
		MediaType mediaType = fileInfoService.getImageMediaType(id);
		return ResponseEntity.ok().contentType(mediaType).body(bytes);

	}

}