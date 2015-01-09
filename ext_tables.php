<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

/**
 * Default TypoScript
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
		'<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/TSConfig/Page.ts">'
);
// Also include TCEMAIN:
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig(
		'<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/TSConfig/Page.ts">'
);
/**
 * Register Custom Content Elements
 */
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'Subugoe.'.$_EXTKEY,
    'Fluidcontentelement',
    'Audio content element'
);

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'Subugoe.'.$_EXTKEY,
    'Audioelement',
    'Audioelement'
);


/**
 * Prepare TCA for Custom Content Elements
 */
\TYPO3\CMS\Core\Utility\GeneralUtility::loadTCA('tt_content');
$TCA['tt_content']['types']['beipoa_fluidcontentelement']['showitem'] = $TCA['tt_content']['types']['media']['showitem'];
$TCA['tt_content']['types']['beipoa_audioelement']['showitem'] = $TCA['tt_content']['types']['media']['showitem'];


/**
 * Settings for divided flags
 */
if (TYPO3_MODE == 'BE' || TYPO3_MODE == 'FE' && isset($GLOBALS['BE_USER'])) {
	// Setting the relative path to the extension in temp. variable:
	$temp_ipoa = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY);

	$flagNames = array(
			'dede', 'deen', 'atde', 'aten', 'chde', 'chen', 'chfr'
	);
	foreach ($flagNames as $flagName) {
		$TCA['sys_language']['columns']['flag']['config']['items'][] = array($flagName, $flagName, $temp_ipoa . '/Resources/Public/Images/flags/' . $flagName . '.png');
	}
	$flagIcons = array();
		foreach ($flagNames as $flagName) {
			$flagIcons[] = 'flags-' . $flagName;
			$flagIcons[] = 'flags-' . $flagName . '-overlay';
		}
		\TYPO3\CMS\Backend\Sprite\SpriteManager::addIconSprite($flagIcons);
		unset($flagNames, $flagName, $flagIcons);
}
// Custom CSS include
$TBE_STYLES['styleSheetFile_post'] = $temp_ipoa . '/Resources/Public/Css/ipoa.css';


?>