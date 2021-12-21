package com.springboot.apirest.service;

import java.util.List;

import com.springboot.apirest.entity.LibroDeseo;

public interface LibroDeseoService {
	public List<LibroDeseo> findAll();
	public LibroDeseo findById(Long id);
	public LibroDeseo save(LibroDeseo librodeseo);
	public void delete(Long id);
}
