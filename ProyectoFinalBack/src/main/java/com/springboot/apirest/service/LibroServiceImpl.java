package com.springboot.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.springboot.apirest.dao.LibroDao;
import com.springboot.apirest.entity.Libro;

@Service
public class LibroServiceImpl implements LibroService{
	
	@Autowired
	private LibroDao libroDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public List<Libro>findAll(){
		return (List<Libro>) libroDao.findAll(); 
	}
	@Override
	@Transactional(readOnly = true)
	public Libro findById(Long id){
		return libroDao.findById(id).orElse(null);
	}
	@Override
	@Transactional
	public Libro save(Libro libro){
		return libroDao.save(libro);
	}
	@Override
	@Transactional
	public void delete(Long id){
		libroDao.deleteById(id);;
	}


}
