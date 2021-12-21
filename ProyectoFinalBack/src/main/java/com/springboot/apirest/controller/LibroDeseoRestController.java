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
import com.springboot.apirest.entity.LibroDeseo;
import com.springboot.apirest.service.LibroDeseoService;

@RestController
public class LibroDeseoRestController {

	@Autowired
	private LibroDeseoService libroDeseoService;
	
	// BUSCAR TODOS LOS LIBROS PARA LEER
		@GetMapping("/libros-para-leer")
		public List<LibroDeseo> index() {
			return libroDeseoService.findAll();
		}
		// BUSCAR LIBRO POR SU ID PARA LEER
		@GetMapping("/libros-para-leer/{id}")
		public ResponseEntity<?> show(@PathVariable Long id) {
			LibroDeseo libroDeseo = null;
			Map<String, Object> response = new HashMap<>();
			try {
				libroDeseo = libroDeseoService.findById(id);
			} catch (DataAccessException e) {
				response.put("mensaje", "Error al realizar consulta en la base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			if (libroDeseo == null) {
				response.put("mensaje", "El libro ID: ".concat(id.toString().concat(" no existe en la base de datos")));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<LibroDeseo>(libroDeseo, HttpStatus.OK);
		}
		// GUARDAR UN LIBRO PARA LEER
		@PostMapping("/libros-para-leer")
		public ResponseEntity<?> create(@RequestBody LibroDeseo libroDeseo) {
			Libro libroDeseoNew = null;
			Map<String, Object> response = new HashMap<>();

			try {
				libroDeseo = libroDeseoService.save(libroDeseo);
			} catch (DataAccessException e) {
				response.put("mensaje", "Error al realizar insert en base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			response.put("mensaje", "El libro ha sido añadido con exito");
			response.put("libroDeseo", libroDeseoNew);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
		// ACTUALIZA UN LIBRO PARA LEER
		@PutMapping("/libros-para-leer/{id}")
		public ResponseEntity<?> update(@RequestBody LibroDeseo libroDeseo, @PathVariable Long id) {
			LibroDeseo libroDeseoActual = libroDeseoService.findById(id);
			LibroDeseo libroDeseoUpdate = null;
			Map<String, Object> response = new HashMap<>();

			if (libroDeseo == null) {
				response.put("mensaje", "Error: No se pudo editar el alumno con ID: "
						.concat(id.toString().concat(" no existe la ID en la base de datos")));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}

			try {
				libroDeseoActual.setTitulo(libroDeseo.getTitulo());
				libroDeseoActual.setAutor(libroDeseo.getAutor());		
				libroDeseoActual = libroDeseoService.save(libroDeseoActual);
				
			} catch (DataAccessException e) {
				response.put("mensaje", "Error al actualizar el libro en la base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("mensaje", "El libro ha sido actualizado con exito");
			response.put("libroDeseo", libroDeseoUpdate);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
		// BORRAR UN LIBRO PARA LEER
		@DeleteMapping("libros-para-leer/{id}")
		public ResponseEntity<?> delete(@PathVariable Long id) {
			Map<String, Object> response = new HashMap<>();
			try {
				libroDeseoService.delete(id);
			} catch (DataAccessException e) {
				response.put("mensaje", "Error al eliminar el libro en la base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("mensaje", "El libro ha sido eliminado con exito");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		}
}
