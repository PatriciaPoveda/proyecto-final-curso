package com.springboot.apirest.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.springboot.apirest.entity.Usuario;



public interface UsuarioDao extends CrudRepository<Usuario, Long> {

	public Usuario findByUsername(String username);
	
	@Query("Select u from Usuario u where u.username=?1")
	public Usuario findByUsername2(String username);
}