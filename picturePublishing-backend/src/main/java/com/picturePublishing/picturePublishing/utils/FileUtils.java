package com.picturePublishing.picturePublishing.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.io.FilenameUtils;
import org.springframework.http.MediaType;

public class FileUtils {

	public static byte[] getImageBytes(byte[] fileDataByte, String fileName) throws IOException {
		ByteArrayInputStream bais = new ByteArrayInputStream(fileDataByte);
		BufferedImage image = ImageIO.read(bais);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		String fileExtension = FilenameUtils.getExtension(fileName);
		ImageIO.write(image, fileExtension, baos);
		byte[] bytes = baos.toByteArray();
		return bytes;

	}

	public static MediaType getMediaType(String mediaType) {
		switch (mediaType) {
		case "image/jpeg":
			return MediaType.IMAGE_JPEG;
		case "image/png":
			return MediaType.IMAGE_PNG;
		default:
			return MediaType.IMAGE_GIF;
		}

	}
}
