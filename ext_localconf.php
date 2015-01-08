<?php
if(!defined('TYPO3_MODE')){
	die('Access denied');
}

/**
 * Configure Fluid Contentelement
 */
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'Subugoe.' . $_EXTKEY,
    'Fluidcontentelement',
    array(
        'Fluidelement' => 'render',
    ),
    array(

    ),
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::PLUGIN_TYPE_CONTENT_ELEMENT
);

/**
 * Include TypoScript for tt_content before static
 */
$fluidelementConstants = trim('
plugin.tx_beipoa {
    view {
        templateRootPath = EXT:be_ipoa/Resources/Private/Templates/
        partialRootPath = EXT:be_ipoa/Resources/Private/Partials/
        layoutRootPath = EXT:be_ipoa/Resources/Private/Layouts/
    }
}
');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript(
    $_EXTKEY,
    'constants',
    $fluidelementConstants
);

/**
 * Include TypoScript for tt_content after static
 */
$fluidelementSetup = trim('
tt_content.be_ipoa_fluidcontentelement = COA
tt_content.be_ipoa_fluidcontentelement {
    10 = < lib.stdheader
    20 = FLUIDTEMPLATE
    20 {
        file = {$plugin.tx_beipoa.view.templateRootPath}Fluidelement/Render.html
        partialRootPath = {$plugin.tx_beipoa.view.partialRootPath}
        layoutRootPath = {$plugin.tx_beipoa.view.layoutRootPath}
    }
}
');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript(
    $_EXTKEY,
    'setup',
    $fluidelementSetup,
    'defaultContentRendering'
);


// adding some Configurations for all users
// hide possibility to directly upload in Contentelements
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.enableBookmarks = 1
	setup.override.edit_docModuleUpload = 0
');
?>

