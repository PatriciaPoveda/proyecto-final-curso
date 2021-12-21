package com.springboot.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.springboot.apirest.dao.LibroDeseoDao;
import com.springboot.apirest.entity.LibroDeseo;

@Service
public class LibroDeseoServiceImpl implements LibroDeseoService{

	@Autowired
	private LibroDeseoDao libroDeseoDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<LibroDeseo>findAll(){
		return (List<LibroDeseo>) libroDeseoDao.findAll(); 
	}
	@Override
	@Transactional(readOnly = true)
	public LibroDeseo findById(Long id){
		return libroDeseoDao.findById(id).orElse(null);
	}
	@Override
	@Transactional
	public LibroDeseo save(LibroDeseo libroDeseo){
		return libroDeseoDao.save(libroDeseo);
	}
	@Override
	@Transactional
	public void delete(Long id){
		libroDeseoDao.deleteById(id);;
	}

}