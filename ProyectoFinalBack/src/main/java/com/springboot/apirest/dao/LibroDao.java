package com.springboot.apirest.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.apirest.entity.Libro;

public interface LibroDao extends CrudRepository<Libro, Long>{

}
