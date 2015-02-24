mod.SHARED.defaultLanguageFlag = dede

TCEMAIN {
	permissions {
		# Besitzergruppe (ID der Gruppe Page Access):
		// TODO: muss noch durch Variablen gesteuert werden
		groupid = 2
		# Rechte Besitzer:
		user = show, editcontent, edit, delete, new
		# Rechte Besitzergruppe:
		group = show
		# Rechte "everybody" (kann ungesetzt bleiben):
		everybody =
	}
}

// Standardmäßig sollen Clipboard, Localization und Editiermöglichkeiten im Backend angezeigt werden
mod.web_list {
	enableClipBoard = activated
	enableDisplayBigControlPanel = activated
	enableLocalizationView = activated
}

[usergroup = 3] OR [usergroup = 4]
	// Setzen der Benutzerrechte beim Anlegen von Seiten und Inhalt
	// 3: Advanced Editing, 4: OA-Tage
	// TODO: muss noch durch Variablen gesteuert werden, falls möglich

	// Verstecken des Moduls "Admin Tools"
	options.hideModules = tools

	// Verstecken unerwünschter möglicher Inhaltselemente
	mod.web_list {

		// verstecke Elemente die im "new record wizard" neu angelegt werden könnten
		deniedNewTables = tx_devlog,backend_layout,sys_domain,tx_rtehtmlarea_acronym,sys_template,tx_scheduler_task_group,sys_note,sys_file_collection,tx_beacl_acl
		hideTables = sys_domain,sys_template,tx_beacl_acl
	}

	// Verstecken unerwünschter Seiten- und Inhaltselemente
	TCEFORM {
		// Entfernen des alternativen Text von image
		// Todo: würde es vermutlich überall entfernen
		#sys_file_reference.alternative.disabled  = 1

		pages {
			description.disabled = 0
			media.disabled = 0
			author.disabled = 0
			#1 = Standard
			#2 = Erweitert
			#3 = Externe URL
			#4 = Shortcut
			#5 = Nicht im Menü
			#6 = Backend Benutzer Bereich
			#7 = Mount Seite
			#199 = Abstand
			#254 = Sysordner
			#255 = Recycler
			#--div-- = Trennlinie
			doktype.removeItems = 6,4,7,3,254,199,255

			// Seiteneigenschaften
			// General
			subtitle.disabled = 1
			nav_title.disabled = 1
			target.disabled = 1
			// Access
			fe_group.disabled = 1
			extendToSubpages.disabled = 1
			fe_login_mode.disabled = 1
			// Metadata
			abstract.disabled = 1
			author.disabled = 1
			author_email.disabled = 1
			lastUpdated.disabled = 1
			// Appearance
			backend_layout.disabled = 1
			backend_layout_next_level.disabled = 1
			content_from_pid.disabled = 1
			// Behaviour
			alias.disabled = 1
			url_scheme.disabled = 1
			cache_timeout.disabled = 1
			no_cache.disabled = 1
			cache_tags.disabled = 1
			is_siteroot.disabled = 1
			no_search.disabled = 1
			editlock.disabled = 1
			php_tree_stop.disabled = 1
			module.disabled = 1
			// Resources
			media.disabled = 1
			storage_pid.disabled = 1
			TSconfig.disabled = 1
		}

		tt_content {
			// Unerwünschte Seitentypen ausblenden (sowohl im "new content element wizard" als auch im Menü)
			// sollen text, image,table, filelist, sitemap(menu), plugin und eigene Elemente bleiben
			CType.removeItems = header,textpic,bullets,media,shortcut,html,div,multimedia,mailform,login,search,tx_beacl_acl,uploads

			// Unerwünschte Auswahlmöglichkeiten bei Inhaltselementen entfernen
			header_layout.removeItems = 1,2,3,4,5
			header_position.disabled = 1
			colPos.disabled = 0
			header_link.disabled = 1
			date.disabled = 1
			linkToTop.disabled = 1
			fe_group.disabled = 1
			section_frame.disabled = 1
			layout.disabled = 1
			margin_top.disabled = 1
			sectionIndex.disabled = 1
			spaceAfter.disabled = 1
			spaceBefore.disabled = 1
			// image:
			imageheight.disabled = 1
			imagewidth.disabled = 1
			imageborder.disabled = 1
			image_effects.disabled = 1
			imageorient.disabled = 1
			image_compression.disabled = 1
			image_noRows.disabled = 1
			imagecols.disabled = 1
			imagecaption_position.disabled = 1
			longdescURL.disabled = 1
			image_zoom.disabled = 1
			// table
			pi_flexform.table.sDEF {
				acctables_tfoot.disabled = 1
				acctables_nostyles.disabled = 1
				acctables_headerpos.disabled = 1
				acctables_tableclass.disabled = 1
			}
			// menu, remove items
			#menu_type.removeItems = 3,7,categorized_content
		}
	}
	// steht in der localconf zum Enternen des Link zum direkten Upload im Contentelement:
	setup.override.edit_docModuleUpload = 0


	// Im "new content element wizard" keine Tabs anzeigen, es sind sowieso nicht so viele Elemente
	mod.wizards.newContentElement.renderMode = list


	// Configuration RTE
	RTE.default {
		hideButtons (
		class,
		blockstylelabel,
		blockstyle,
		textstylelabel,
		textstyle,
		indent,
		outdent,
		textindicator,
		table,
		toggleborders,
		tableproperties,
		chMode,
		rowproperties,
		rowinsertabove,
		rowinsertunder,
		rowdelete,
		rowsplit,
		columninsertbefore,
		columninsertafter,
		columndelete,
		columnsplit,
		cellproperties,
		cellinsertbefore,
		cellinsertafter,
		celldelete,
		cellsplit,
		cellmerge,
		underline,
		strikethrough
		)
		buttons.formatblock.removeItems (
		address,
		article,
		aside,
		div,
		footer,
		nav,
		header,
		h1,
		h2,
		h5,
		h6,
		pre,
		section
		)
		# disable options in extra window to create links
		buttons.link {
			targetSelector.disabled = 1
			popupSelector.disabled = 1
			properties.class.allowedClasses := removeFromList(external-link,external-link-new-window,internal-link,internal-link-new-window,download,mail)
			# remove folder tab in link wizard
			options.removeItems = folder
		}
	}

	# Hide possibility to upload files in Element Browser
	options.folderTree.uploadFieldsInLinkBrowser = 0

[END]


