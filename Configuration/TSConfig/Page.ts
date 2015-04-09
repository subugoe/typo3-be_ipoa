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

# global instructions for RTE, even for admins
# show and/or remove more unwanted tags (partially done in rtehtmlarea/res/typical/pageTSConfig.txt)
RTE.default {
	removeTags = pre,div,h1,h5,h6
	# remove inline style attributes
	proc.entryHTMLparser_db.tags {
		p.fixAttrib.style.unset = 1
		span.fixAttrib.style.unset = 1
		ul.fixAttrib.style.unset = 1
		li.fixAttrib.style.unset = 1
		h2.fixAttrib.style.unset = 1
		br.fixAttrib.style.unset = 1
	}
}

//////////////////////////////////////////////////////
// Einstellungen für Editoren
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
			// Unerwünschte Auswahlmöglichkeiten bei Inhaltselementen entfernen oder ändern
			CType.removeItems = header,textpic,bullets,media,shortcut,html,div,multimedia,mailform,login,search,tx_beacl_acl,uploads

			header_layout.altLabels.1 = Standard
			header_layout.altLabels.2 = OA-Tage Untertitel
			header_layout.removeItems = 0,3,4,5,100
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
		toolbarOrder = formatblock, textstylelabel, bold, italic, subscript, superscript, orderedlist, unorderedlist, insertcharacter, link, findreplace, removeformat, undo, redo, showhelp
		hideButtons (
			image,
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
		# Remove items in format list
		buttons.formatblock {
			removeItems (
				address,
				article,
				aside,
				div,
				footer,
				nav,
				header,
				p,
				h1,
				h2,
				h5,
				h6,
				pre,
				section
			)
			items {
				h3.label = Überschrift 3
				h4.label = Überschrift 4
				blockquote.label = Einrückung
			}
		}
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

//////////////////////////////////////////////////////
// Spezielle Einstellungen für die OA Tage
[PIDinRootline = 609]

	// Images im RTE erlauben
	RTE.default.proc {
		allowTag := addToList(img)
		entryHTMLparser_db.tags.img >
		allowTagsOutside := addToList(img)
	}
	RTE.default.showButtons := addToList(image)
	RTE.default.hideButtons := removeFromList(image)

	//  Anpassen des Image Wizards vom RTE aus
	RTE.default.buttons.image.options.removeItems = magic,dragdrop
	RTE.default.buttons.image.properties.class.default = oadays__image
	// ,,, und des vom Image Wizard erzeugten Codes (alles andere wird rausgeschmissen)
	RTE.default.proc.entryHTMLparser_db.tags.img.allowedAttribs = src,alt,title,description,class
	RTE.default.proc.exitHTMLparser_db.tags.img.allowedAttribs = src,alt,title,description,class

	// Zur Verfügung stellen von Auszeichnungen für Aufklappcontents und -links
	RTE.default.hideButtons := removeFromList(textstylelabel, textstyle)
	RTE.default.showButtons := addToList(textstylelabel, textstyle)
	RTE.default.contentCSS = typo3conf/ext/be_ipoa/Resources/Public/Css/rte.css
	// Content
	RTE.default.proc.allowedClasses := addToList(on-demand__content)
	RTE.default.buttons.formatblock {
		addItems = on-demand__content
		items.on-demand__content {
			label = Ausklappbarer Content
			tagName = blockquote
			addClass = on-demand__content
			value = color: #a80f4f;
		}
	}
	// Links
	RTE.default.proc.allowedClasses := removeFromList(detail, important, name-of-person)
	RTE.default.proc.allowedClasses := addToList(on-demand__link)
	RTE.default.buttons.textstyle.tags.span.allowedClasses = on-demand__link
	RTE.classes {
		on-demand__link {
			name = Aufklapplink
			value = color: #a80f4f;
		}
	}
	# ohne die folgende Zeile wird das Span beim Speichern entfernt
	RTE.config.tt_content.bodytext.proc.allowedClasses := addToList(on-demand__link)

[end]


[PIDinRootline = 609] && [usergroup = 3] OR [usergroup = 4]

	RTE.default.toolbarOrder = formatblock, textstylelabel, textstyle, linebreak, bold, italic, subscript, superscript, orderedlist, unorderedlist, insertcharacter, link, image, findreplace, removeformat, undo, redo, showhelp

[end]