package com.springboot.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.apirest.entity.Libro;
import com.springboot.apirest.service.LibroService;

@RestController
public class LibroRestController {

	@Autowired
	private LibroService libroService;
	
	// BUSCAR TODOS LOS LIBROS
	@GetMapping("/libros")
	public List<Libro> index() {
		return libroService.findAll();
	}
	
	// BUSCAR LIBRO POR SU ID
	@GetMapping("/libros/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Libro libro = null;
		Map<String, Object> response = new HashMap<>();
		try {
			libro = libroService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if (libro == null) {
			response.put("mensaje", "El libro ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Libro>(libro, HttpStatus.OK);
	}
	
	// GUARDAR UN LIBRO
	@PostMapping("/libros")
	public ResponseEntity<?> create(@RequestBody Libro libro) {
		Libro libroNew = null;
		Map<String, Object> response = new HashMap<>();

		try {
			libro = libroService.save(libro);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar insert en base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El libro ha sido añadido con exito");
		response.put("libro", libroNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	// ACTUALIZA UN LIBRO
	@PutMapping("/libros/{id}")
	public ResponseEntity<?> update(@RequestBody Libro libro, @PathVariable Long id) {
		Libro libroActual = libroService.findById(id);
		Libro libroUpdate = null;
		Map<String, Object> response = new HashMap<>();

		if (libro == null) {
			response.put("mensaje", "Error: No se pudo editar el alumno con ID: "
					.concat(id.toString().concat(" no existe la ID en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {
			libroActual.setTitulo(libro.getTitulo());
			libroActual.setAutor(libro.getAutor());	
			if (libro.getCreateAt() != null) {
				libroActual.setCreateAt(libro.getCreateAt());
			} else {
				libroActual.setCreateAt(libroActual.getCreateAt());
			}		
			libroActual = libroService.save(libroActual);
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el libro en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El libro ha sido actualizado con exito");
		response.put("libro", libroUpdate);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	// BORRAR UN LIBRO
	@DeleteMapping("libros/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			libroService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar el libro en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El libro ha sido eliminado con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
