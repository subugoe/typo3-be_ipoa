<?php
if(!defined('TYPO3_MODE')){
	die('Access denied');
}

// adding some Configurations for all users
// hide possibility to directly upload in Contentelements
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
	options.enableBookmarks = 1
	setup.override.edit_docModuleUpload = 0
');
?>

