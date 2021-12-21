package com.springboot.apirest.service;

import java.util.List;

import com.springboot.apirest.entity.Libro;



public interface LibroService {

	public List<Libro> findAll();
	public Libro findById(Long id);
	public Libro save(Libro libro);
	public void delete(Long id);
}
