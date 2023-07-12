
/*
 * ArkhamHorrorLCG.js
 */

useLibrary( 'extension' );
useLibrary( 'imageutils' );
useLibrary( 'fontutils' );
useLibrary('tints');

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'markup' );

importClass( arkham.diy.ListItem );
importClass( resources.StrangeImage );
importClass( java.io.File );
importClass( java.lang.System );
importClass( java.util.Locale );

useLibrary( 'res://ArkhamHorrorLCG/diy/AHLCG-utilLibrary.js' );
useLibrary( 'res://ArkhamHorrorLCG/diy/AHLCG-preferences.js' );

function() initialize {
	var GameLanguage = Language.getGame();
	var InterfaceLanguage = Language.getInterface();
	
	System.setProperty( "swing.aatext", "true" );
    System.setProperty( "awt.useSystemAAFontSettings", "on" );
	
	InterfaceLanguage.addStrings( 'ArkhamHorrorLCG/text/AHLCG-Interface' );
	GameLanguage.addStrings( 'ArkhamHorrorLCG/text/AHLCG-Game' );

	const ahlcgGame = Game.register(
		'AHLCG', 'AHLCG-ArkhamHorrorLCG', image( 'AHLCG-Game', 'icons', 'png' )
	);

	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Game.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Asset.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Event.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Skill.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Investigator.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Enemy.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-WeaknessEnemy.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Treachery.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-WeaknessTreachery.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Location.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Agenda.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Act.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Chaos.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-AssetStory.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-AgendaPortrait.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-MiniInvestigator.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Scenario.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-BackPortrait.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Story.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Guide75.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-GuideA4.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Divider.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-AgendaFrontPortrait.settings');

	Eons.namedObjects.AHLCGObject = new gameObject( ahlcgGame.masterSettings );

	addPreferences();
	
	ClassMap.add( 'ArkhamHorrorLCG/ArkhamHorrorLCG.classmap' );
}

function setupFonts( o ) {
	var userSettings = Settings.getUser();

	const registerTTFont = function registerTTFont() {
		for( let i=0; i<arguments.length; ++i ) {
			arguments[i] = 'ArkhamHorrorLCG/fonts/' + arguments[i] + '.ttf';
		}
		return FontUtils.registerFontFamilyFromResources.apply( this, arguments );
	};
	const registerOTFont = function registerOTFont() {
		for( let i=0; i<arguments.length; ++i ) {
			arguments[i] = 'ArkhamHorrorLCG/fonts/' + arguments[i] + '.otf';
		}
		return FontUtils.registerFontFamilyFromResources.apply( this, arguments );
	};

	var titleFontFamily = userSettings.get( 'AHLCG-DefaultTitleFont' );
	var subtitleFontFamily = userSettings.get( 'AHLCG-DefaultSubtitleFont' );
	var typeFontFamily = userSettings.get( 'AHLCG-DefaultCardTypeFont' );
	var bodyFontFamily = userSettings.get( 'AHLCG-DefaultBodyFont' );
	var traitFontFamily = userSettings.get( 'AHLCG-DefaultTraitFont' );
	var victoryFontFamily = userSettings.get( 'AHLCG-DefaultVictoryFont' );
	var flavorFontFamily = userSettings.get( 'AHLCG-DefaultFlavorFont' );
	var storyFontFamily = userSettings.get( 'AHLCG-DefaultStoryFont' );
	var collectionFontFamily = userSettings.get( 'AHLCG-DefaultCollectionFont' );

	var fTitleSize = userSettings.get( 'AHLCG-DefaultTitleFontSize', '100' );
	var fSubtitleSize = userSettings.get( 'AHLCG-DefaultSubtitleFontSize', '100' );
	var fCardTypeSize = userSettings.get( 'AHLCG-DefaultCardTypeFontSize', '100' );
	var fBodySize = userSettings.get( 'AHLCG-DefaultBodyFontSize', '100' );
	var fTraitSize = userSettings.get( 'AHLCG-DefaultTraitFontSize', '100' );
	var fVictorySize = userSettings.get( 'AHLCG-DefaultVictoryFontSize', '100' );
	var fFlavorSize = userSettings.get( 'AHLCG-DefaultFlavorFontSize', '100' );
	var fStorySize = userSettings.get( 'AHLCG-DefaultStoryFontSize', '100' );
	var fCollectionSize = userSettings.get( 'AHLCG-DefaultCollectionFontSize', '100' );

	var fTitleOffset = userSettings.get( 'AHLCG-DefaultTitleFontOffset', '0' );
	var fSubtitleOffset = userSettings.get( 'AHLCG-DefaultSubtitleFontOffset', '0' );
	var fCardTypeOffset = userSettings.get( 'AHLCG-DefaultCardTypeFontOffset', '0' );
	var fBodyOffset = userSettings.get( 'AHLCG-DefaultBodyFontOffset', '0' );
	var fTraitsOffset = userSettings.get( 'AHLCG-DefaultTraitsFontOffset', '0' );
	var fVictoryOffset = userSettings.get( 'AHLCG-DefaultVictoryFontOffset', '0' );
	var fFlavorOffset = userSettings.get( 'AHLCG-DefaultFlavorFontOffset', '0' );
	var fStoryOffset = userSettings.get( 'AHLCG-DefaultStoryFontOffset', '0' );
	var fCollectionOffset = userSettings.get( 'AHLCG-DefaultCollectionFontOffset', '0' );	
	
//	var defaultFontList = 'Arno Pro, Times New Roman';
	var defaultFontList = 'Times New Roman';

	var locale = getLocale();
//println(locale);
	// Default (Times New Roman/Teutonic)
	o.bodyFontTightness = 1.5;
//	o.bodyFontTightness = 1.0;
//	o.bodyFontTightness = 0.9;

	o.titleFontSize = 11.0;
	o.titleFontWidth = 1.0;
	o.titleFontWeight = 800;
	o.titleFontTracking = 0.015;
			
	o.bodyFontSize = 7.8;
	o.bodyFontWidth = 1.0;
	o.bodyFontWeight = 600;
//	o.bodyFontTracking = 0.00;
	o.bodyFontTracking = 0.01;
	o.bodyStorySize = 7.2;
	o.bodyTraitSize = 7.2;
	o.bodyFlavorSize = 7.2;
	o.bodyStoryWidth = 0.9;
	o.bodyTraitWidth = 0.9;
	o.bodyFlavorWidth = 0.9;
	o.bodyStoryTracking = -0.01;
	o.bodyTraitTracking = 0.00;
	o.bodyFlavorTracking = -0.01;
	o.smallLabelSize = 4.4;
	o.smallLabelWeight = WEIGHT_REGULAR;
	o.smallLabelWidth = 0.92;
	o.smallLabelTracking = 0.00;
	o.largeLabelSize = 5.6;
	o.largeLabelWeight = WEIGHT_BOLD;
	o.largeLabelWidth = 1.05;
	o.largeLabelTracking = 0.00;
//	o.subtypeSize = 5.5;
	o.subtypeSize = 5.6;
	o.subtypeWeight = WEIGHT_BOLD;
	o.subtypeWidth = 1.0;
	o.subtypeTracking = 0.00;
	o.subtitleSize = 6.0;
	o.subtitleWidth = 1.0;
	o.subtitleWeight = WEIGHT_BOLD;
	o.subtitleTracking = 0.00;
	o.scenarioIndexSize = 6.5;
	o.scenarioIndexWeight = WEIGHT_BOLD;
	o.scenarioIndexWidth = WIDTH_REGULAR;
	o.scenarioIndexTracking = 0.00;
	o.scenarioIndexBackSize = 4.9;
	o.indexSuffixSize = 6.5;
	o.indexSuffixWeight = WEIGHT_BOLD;
	o.indexSuffixWidth = WIDTH_REGULAR;
	o.indexSuffixTracking = 0.00;
	o.indexBackSuffixSize = 4.9;
	o.collectionSize = 4.2;
	o.collectionWeight = WEIGHT_BOLD;
	o.collectionWidth = 1.0;
	o.collectionTracking = 0.01;
	o.difficultySize = 5.6;
	o.difficultyWeight = WEIGHT_BOLD;
	o.difficultyWidth = 0.97;
	o.difficultyTracking = 0.0;

	o.titleFontOffset = 0;
	o.subtitleFontOffset = 0;
	o.typeFontOffset = 0;
	o.bodyFontOffset = 0;
	o.traitFontOffset = 0;
	o.victoryFontOffset = 0;
	o.flavorFontOffset = 0;
	o.storyFontOffset = 0;
	o.collectionFontOffset = 0;

	if ( titleFontFamily == null || titleFontFamily == 'Default' ) {
		o.titleFamily = registerTTFont( 'Teutonic' );		
	}
	else {
		o.titleFamily = titleFontFamily;

		o.titleFontSize = 11.0 * fTitleSize / 100.0;
		o.titleFontWidth = 1.0;
		o.titleFontWeight = 800;
		o.titleFontTracking = 0.0;

		o.titleFontOffset = fTitleOffset;
	}

	if ( subtitleFontFamily == null || subtitleFontFamily == 'Default' ) {
		o.subtitleFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.subtitleFamily == 'Arno Pro' ) {
			o.subtitleSize = 6.4;
			o.subtitleWidth = 0.96;
			o.subtitleWeight = WEIGHT_BOLD;
			o.subtitleTracking = 0.00;

			o.subtitleFontOffset = 0;
		}
		else if ( o.subtitleFamily == 'Times New Roman' ) {
			o.subtitleFontOffset = -2;
		}
	}
	else {
		o.subtitleFamily = subtitleFontFamily;

		o.subtitleSize = 6.0 * fSubtitleSize / 100.0;
		o.subtitleWidth = 1.0;
		o.subtitleWeight = WEIGHT_BOLD;
		o.subtitleTracking = 0.00;
/*
		o.scenarioIndexSize = 7.0 * fSubtitleSize / 100.0;
		o.scenarioIndexWidth = 1.05;
		o.scenarioIndexWeight = WEIGHT_REGULAR;
		o.scenarioIndexTracking = 0.00;
		o.scenarioIndexBackSize = 4.9;
*/
		o.subtitleFontOffset = fSubtitleOffset;
	}

	if ( typeFontFamily == null || typeFontFamily == 'Default' ) {
		o.typeFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.typeFamily == 'Arno Pro' ) {
			o.smallLabelSize = 5.0;
			o.smallLabelWidth = 0.92;
			o.smallLabelWeight = WEIGHT_REGULAR;
			o.smallLabelTracking = 0.00;
			o.largeLabelSize = 6.0;
			o.largeLabelWidth = 1.05;
			o.largeLabelWeight = WEIGHT_BOLD;
			o.largeLabelTracking = 0.00;
//			o.subtypeSize = 6.5;
			o.subtypeSize = 6.0;
			o.subtypeWidth = 1.0;
			o.subtypeWeight = WEIGHT_BOLD;
			o.subtypeTracking = 0.00;
			o.scenarioIndexSize = 7.0;
			o.scenarioIndexWeight = WEIGHT_BOLD;
			o.scenarioIndexWidth = WIDTH_REGULAR;
			o.scenarioIndexTracking = 0.00;
			o.scenarioIndexBackSize = 4.9;
			o.difficultySize = 6.0;
			o.difficultyWidth = 0.97;
			o.difficultyWeight = WEIGHT_BOLD;
			o.difficultyTracking = 0.0;			
			
			o.typeFontOffset = 0;
		}
		else if ( o.typeFamily == 'Times New Roman' ) {
			o.typeFontOffset = -1;
		}
	}
	else {
		o.typeFamily = typeFontFamily;

		o.smallLabelSize = 4.4 * fCardTypeSize / 100.0;
		o.smallLabelWidth = 1.00;
		o.smallLabelWeight = WEIGHT_REGULAR;
		o.smallLabelTracking = 0.00;
		o.largeLabelSize = 5.6 * fCardTypeSize / 100.0;
		o.largeLabelWidth = 1.00;
		o.largeLabelWeight = WEIGHT_BOLD;
		o.largeLabelTracking = 0.00;
//		o.subtypeSize = 5.5 * fCardTypeSize / 100.0;
		o.subtypeSize = 5.6 * fCardTypeSize / 100.0;
		o.subtypeWidth = 1.0;
		o.subtypeWeight = WEIGHT_BOLD;
		o.subtypeTracking = 0.00;
		o.scenarioIndexSize = 6.5 * fCardTypeSize / 100.0;
		o.scenarioIndexWeight = WEIGHT_BOLD;
		o.scenarioIndexWidth = WIDTH_REGULAR;
		o.scenarioIndexTracking = 0.00;
		o.scenarioIndexBackSize = 4.9 * fCardTypeSize / 100.0;
		o.difficultySize = 5.6 * fSubtitleSize / 100.0;
		o.difficultyWidth = 1.00;
		o.difficultyWeight = WEIGHT_BOLD;
		o.difficultyTracking = 0.00;
		
		o.typeFontOffset = fCardTypeOffset;
	}

	if ( bodyFontFamily == null || bodyFontFamily == 'Default' ) {
		o.bodyFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.bodyFamily == 'Arno Pro' ) {
//			o.bodyFontSize = 8.4;
			o.bodyFontSize = 8.5;
			o.bodyFontWidth = 1.0;
			o.bodyFontWeight = 600;
//			o.bodyFontTracking = -0.01;
			o.bodyFontTracking = 0.0;
			o.bodyFontTightness = 1.0;
			
			o.bodyFontOffset = 0;
		}
		else if ( o.bodyFamily == 'Times New Roman' ) {
			o.bodyFontOffset = -2;
		}
	}
	else {
		o.bodyFamily = bodyFontFamily;

		o.bodyFontSize = 8.0 * fBodySize / 100.0;
		o.bodyFontWidth = 1.0;
		o.bodyFontWeight = 600;
		o.bodyFontTracking = 0.00;

		o.bodyFontOffset = fBodyOffset;
	}
	
	if ( traitFontFamily == null || traitFontFamily == 'Default' ) {
		o.traitFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );
		
		if ( o.traitFamily == 'Arno Pro' ) {
			o.bodyTraitSize = 7.8;
			o.bodyTraitWidth = 1.0;
			o.bodyTraitWeight = WEIGHT_REGULAR;
			o.bodyTraitTracking = 0.00;
			
			o.traitFontOffset = 0;
		}
		else if ( o.traitFamily == 'Times New Roman' ) {
			o.traitFontOffset = -2;
		}
	}
	else {
		o.traitFamily = traitFontFamily;
		
		o.bodyTraitSize = 7.2 * fTraitSize / 100.0;
		o.bodyTraitWidth = 1.0;
		o.bodyTraitWeight = WEIGHT_REGULAR;
		o.bodyTraitTracking = 0.00;

		o.traitFontOffset = fTraitsOffset;
	}
	
	if ( victoryFontFamily == null || victoryFontFamily == 'Default' ) {
		o.victoryFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.victoryFamily == 'Arno Pro' ) {
			o.bodyVictorySize = 7.8;
			o.bodyVictoryWidth = 1.0;
			o.bodyVictoryWeight = WEIGHT_REGULAR;
			o.bodyVictoryTracking = 0.00;
			
			o.victoryFontOffset = 0;
		}
		else if ( o.victoryFamily == 'Times New Roman' ) {
			o.victoryFontOffset = -2;
		}
	}
	else {
		o.victoryFamily = victoryFontFamily;
		
		o.bodyVictorySize = 7.2 * fVictorySize / 100.0;
		o.bodyVictoryWidth = 1.0;
		o.bodyVictoryWeight = WEIGHT_REGULAR;
		o.bodyVictoryTracking = 0.00;
		
		o.victoryFontOffset = fVictoryOffset;
	}

	if ( flavorFontFamily == null || flavorFontFamily == 'Default' ) {
		o.flavorFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.flavorFamily == 'Arno Pro' ) {
			o.bodyFlavorSize = 7.8;
			o.bodyFlavorWidth = 1.0;
			o.bodyFlavorWeight = WEIGHT_REGULAR;
			o.bodyFlavorTracking = -0.01;
			
			o.flavorFontOffset = 0;
		}
		else if ( o.flavorFamily == 'Times New Roman' ) {
			o.flavorFontOffset = -2;
		}
	}
	else {
		o.flavorFamily = flavorFontFamily;

		o.bodyFlavorSize = 7.2 * fFlavorSize / 100.0;
		o.bodyFlavorWidth = 1.0;
		o.bodyFlavorWeight = WEIGHT_REGULAR;
		o.bodyFlavorTracking = 0.00;
				
		o.flavorFontOffset = fFlavorOffset;
	}

	if ( storyFontFamily == null || storyFontFamily == 'Default' ) {
		o.storyFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.storyFamily == 'Arno Pro' ) {
			o.bodyStorySize = 8.6;
			o.bodyStoryWidth = 1.0;
			o.bodyStoryWeight = WEIGHT_REGULAR;
			o.bodyStoryTracking = 0.00;
			
			o.storyFontOffset = 0;
		}
		else if ( o.storyFamily == 'Times New Roman' ) {
			o.storyFontOffset = -2;
		}
	}
	else {
		o.storyFamily = storyFontFamily;

		o.bodyStorySize = 8.0 * fStorySize / 100.0;
		o.bodyStoryWidth = 1.0;
		o.bodyStoryWeight = WEIGHT_REGULAR;
		o.bodyStoryTracking = 0.00;
								
		o.storyFontOffset = fStoryOffset;
	}
			
	if ( collectionFontFamily == null || collectionFontFamily == 'Default' ) {
		o.collectionFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9' );

		if ( o.collectionFamily == 'Arno Pro' ) {
			o.collectionSize = 4.5;
			o.collectionWidth = 1.0;
			o.collectionWeight = WEIGHT_REGULAR;
			o.collectionTracking = 0.01;
			
			o.collectionFontOffset = 0;
		}
		else if ( o.collectionFamily == 'Times New Roman' ) {
			o.collectionFontOffset = -1;
		}
	}
	else {
		o.collectionFamily = collectionFontFamily;
				
		o.collectionSize = 4.2 * fCollectionSize / 100.0;
		o.collectionWidth = 1.0;
		o.collectionWeight = WEIGHT_BOLD;
		o.collectionTracking = 0.00;

		o.collectionFontOffset = fCollectionOffset;
	}
			
///	if ( locale == 'zh' ) {
///		fontFamily = ResourceKit.findAvailableFontFamily( 'SimSun, Arno Pro, Times New Roman', 'NimbusRomNo9' );
///	}
///	else {
//		fontFamily = ResourceKit.findAvailableFontFamily( 'Arno Pro, Times New Roman', 'NimbusRomNo9L' );
///		fontFamily = ResourceKit.findAvailableFontFamily( 'Times New Roman', 'NimbusRomNo9L' );
///	}	
/*
	if ( locale == 'zh' ) {
		this.bodyFamily = fontFamily;

		this.bodyFontTightness = 1.0;

		this.titleFontSize = 11.0;
		this.titleFontWidth = 1.0;
		this.titleFontWeight = 800;
		this.titleFontTracking = 0.0;
			
		this.bodyFontSize = 7;
		this.bodyFontWidth = 1.0;
		this.bodyFontWeight = 600;
		this.bodyFontTracking = -0.01;
		this.bodyStorySize = 7.0;
		this.bodyTraitSize = 6.5;
		this.bodyFlavorSize = 6.5;
		this.bodyStoryWidth = 1.0;
		this.bodyTraitWidth = 1.0;
		this.bodyFlavorWidth = 1.0;
		this.bodyStoryTracking = 0.00;
		this.bodyTraitTracking = 0.00;
		this.bodyFlavorTracking = -0.01;
		this.smallLabelSize = 5.0;
		this.smallLabelWeight = WEIGHT_REGULAR;
		this.smallLabelWidth = 0.92;
		this.smallLabelTracking = 0.00;
		this.largeLabelSize = 6.0;
		this.largeLabelWeight = WEIGHT_BOLD;
		this.largeLabelWidth = 1.05;
		this.largeLabelTracking = 0.00;
		this.subtypeSize = 6.5;
		this.subtypeWeight = WEIGHT_BOLD;
		this.subtypeWidth = 1.0;
		this.subtypeTracking = 0.00;
		this.subtitleSize = 6.4;
		this.subtitleWidth = 1.0;
		this.subtitleWeight = WEIGHT_BOLD;
		this.subtitleTracking = 0.00;
		this.scenarioIndexSize = 7.0;
		this.scenarioIndexWeight = WEIGHT_REGULAR;
		this.scenarioIndexWidth = 1.05;
		this.scenarioIndexTracking = 0.00;
		this.scenarioIndexBackSize = 4.9;
		this.collectionSize = 4.5;
		this.collectionWeight = WEIGHT_REGULAR;
		this.collectionWidth = 1.0;
		this.collectionTracking = 0.01;
		this.difficultySize = 6.0;
		this.difficultyWeight = WEIGHT_BOLD;
		this.difficultyWidth = 0.97;
		this.difficultyTracking = 0.0;			
	}
	else 
*/
//	if (customFont) {
//	if (false) {
//		this.bodyFontTightness = 1.0;
/*
		this.titleFontSize = 11.0 * fTitleSize;
		this.titleFontWidth = 1.0;
		this.titleFontWeight = 800;
		this.titleFontTracking = 0.0;
*/			
/*
		this.bodyFontSize = 8.0 * fBodySize;
		this.bodyFontWidth = 1.0;
		this.bodyFontWeight = 600;
		this.bodyFontTracking = 0.00;
*/
//		this.bodyStorySize = 8.0 * fStorySize;
//		this.bodyTraitSize = 7.2 * fTraitSize;
//		this.bodyFlavorSize = 7.2 * fFlavorSize;
//		this.bodyStoryWidth = 1.0;
//		this.bodyTraitWidth = 1.0;
//		this.bodyFlavorWidth = 1.0;
//		this.bodyStoryTracking = 0.00;
//		this.bodyTraitTracking = 0.00;
//		this.bodyFlavorTracking = 0.00;
/*
		this.smallLabelSize = 4.4 * fCardTypeSize;
		this.smallLabelWeight = WEIGHT_REGULAR;
		this.smallLabelWidth = 1.00;
		this.smallLabelTracking = 0.00;
		this.largeLabelSize = 5.6 * fCardTypeSize;
		this.largeLabelWeight = WEIGHT_BOLD;
		this.largeLabelWidth = 1.00;
		this.largeLabelTracking = 0.00;
*/
/*
		this.subtypeSize = 5.5 * fCardTypeSize;
		this.subtypeWeight = WEIGHT_BOLD;
		this.subtypeWidth = 1.0;
		this.subtypeTracking = 0.00;
*/
/*
		this.subtitleSize = 6.0 * fBodySize;
		this.subtitleWidth = 1.0;
		this.subtitleWeight = WEIGHT_BOLD;
		this.subtitleTracking = 0.00;
*/
/*
		this.scenarioIndexSize = 6.5 * fCardTypeSize;
		this.scenarioIndexWeight = WEIGHT_REGULAR;
		this.scenarioIndexWidth = WIDTH_REGULAR;
		this.scenarioIndexTracking = 0.00;
		this.scenarioIndexBackSize = 4.9 * fCardTypeSize;
*/
/*
		this.collectionSize = 4.2 * fBodySize;
		this.collectionWeight = WEIGHT_BOLD;
		this.collectionWidth = 1.0;
		this.collectionTracking = 0.00;
*/
/*
		this.difficultySize = 5.6 * fTitleSize;
		this.difficultyWeight = WEIGHT_BOLD;
		this.difficultyWidth = 1.00;
		this.difficultyTracking = 0.00;
*/
//	}
//	else if ( bodyFontFamily == 'Arno Pro' ) {
//		this.bodyFamily = 'Arno Pro';

//		this.bodyFontTightness = 1.0;
/*
		this.titleFontSize = 11.0;
		this.titleFontWidth = 1.0;
		this.titleFontWeight = 800;
		this.titleFontTracking = 0.0;
*/			
/*
		this.bodyFontSize = 8.8;
		this.bodyFontWidth = 1.0;
		this.bodyFontWeight = 600;
		this.bodyFontTracking = -0.01;
*/
//		this.bodyStorySize = 8.8;
//		this.bodyTraitSize = 7.8;
//		this.bodyFlavorSize = 7.8;
//		this.bodyStoryWidth = 1.0;
//		this.bodyTraitWidth = 1.0;
//		this.bodyFlavorWidth = 1.0;
//		this.bodyStoryTracking = 0.00;
//		this.bodyTraitTracking = 0.00;
//		this.bodyFlavorTracking = -0.01;
/*
		this.smallLabelSize = 5.0;
		this.smallLabelWeight = WEIGHT_REGULAR;
		this.smallLabelWidth = 0.92;
		this.smallLabelTracking = 0.00;
		this.largeLabelSize = 6.0;
		this.largeLabelWeight = WEIGHT_BOLD;
		this.largeLabelWidth = 1.05;
		this.largeLabelTracking = 0.00;
*/
/*
		this.subtypeSize = 6.5;
		this.subtypeWeight = WEIGHT_BOLD;
		this.subtypeWidth = 1.0;
		this.subtypeTracking = 0.00;
*/
/*
		this.subtitleSize = 6.4;
		this.subtitleWidth = 1.0;
		this.subtitleWeight = WEIGHT_BOLD;
		this.subtitleTracking = 0.00;
*/
/*
		this.scenarioIndexSize = 7.0;
		this.scenarioIndexWeight = WEIGHT_REGULAR;
		this.scenarioIndexWidth = 1.05;
		this.scenarioIndexTracking = 0.00;
		this.scenarioIndexBackSize = 4.9;
*/
/*
		this.collectionSize = 4.5;
		this.collectionWeight = WEIGHT_REGULAR;
		this.collectionWidth = 1.0;
		this.collectionTracking = 0.01;
*/
/*
		this.difficultySize = 6.0;
		this.difficultyWeight = WEIGHT_BOLD;
		this.difficultyWidth = 0.97;
		this.difficultyTracking = 0.0;			
*/
//	}
//	else if ( fontFamily == 'Times New Roman' ) this.bodyFamily = 'Times New Roman';
//	else 

	suffixFontFamily = ResourceKit.findAvailableFontFamily( defaultFontList, 'NimbusRomNo9L' );
	o.suffixFamily = suffixFontFamily;

		if ( o.typeFamily == 'Arno Pro' ) {
			o.indexSuffixSize = 7.0;
			o.indexSuffixWeight = WEIGHT_BOLD;
			o.indexSuffixWidth = WIDTH_REGULAR;
			o.indexSuffixTracking = 0.00;
			o.indexBackSuffixSize = 4.9;
		}
		
	if ( bodyFontFamily == 'NimbusRomNo9' ) o.bodyFamily = registerOTFont( 'NimbusRomNo9L-Med', 'NimbusRomNo9L-MedIta', 'NimbusRomNo9L-Reg', 'NimbusRomNo9L-RegIta' );

	o.symbolSize = 6.8;

	o.skillFamily = registerTTFont( 'Bolton', 'BoltonBold' );
	o.symbolFamily = registerTTFont( 'AHLCGSymbol');
	
	o.costFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/Teutonic.ttf', 16.0);
	o.enemyFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/Bolton.ttf', 16.0);
	o.symbolFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 16.0);
//	o.headerFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 11.2);
	o.chaosFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 14.0);
}

function gameObject( masterSettings ) {
	this.OS = "Windows";	// default
	
	var systemOS = System.getProperty("os.name", "generic").toLowerCase(Locale.ENGLISH);
	
	if ( systemOS.indexOf("mac") >= 0 || systemOS.indexOf("darwin") >= 0) {
		this.OS = "Mac";
	}

	setupFonts( this );

	// updated arrays for language support
	this.comboClassesI = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral', @AHLCG-Class-Neutral ),
		ListItem( 'ParallelGuardian', @AHLCG-Class-ParallelGuardian ),
		ListItem( 'ParallelSeeker', @AHLCG-Class-ParallelSeeker ),
		ListItem( 'ParallelRogue', @AHLCG-Class-ParallelRogue ),
		ListItem( 'ParallelMystic', @AHLCG-Class-ParallelMystic ) );
		
	this.comboClassesBW = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral' , @AHLCG-Class-Neutral ),
		ListItem( 'Weakness' , @AHLCG-Class-Weakness ),
		ListItem( 'BasicWeakness', @AHLCG-Class-BasicWeakness ) );
	
	this.comboClassesW = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral' , @AHLCG-Class-Neutral ),
		ListItem( 'Weakness' , @AHLCG-Class-Weakness ) );
		
	this.comboClassesD = new Array( 
		ListItem( 'None', @AHLCG-Class-None ),
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ) );

	this.comboStoryAssetClasses = new Array( 
		ListItem( 'Neutral', @AHLCG-Class-Neutral ),
		ListItem( 'Weakness', @AHLCG-Class-Weakness ) );

	this.comboSkills = new Array( 
		ListItem( 'None', @AHLCG-Skill-None ),
		ListItem( 'Willpower', @AHLCG-Skill-Willpower ),
		ListItem( 'Intellect', @AHLCG-Skill-Intellect ),
		ListItem( 'Combat', @AHLCG-Skill-Combat ),
		ListItem( 'Agility', @AHLCG-Skill-Agility ),
		ListItem( 'Wild' , @AHLCG-Skill-Wild ) );
		
	this.comboSlots = new Array( 
		ListItem( 'None', @AHLCG-Slot-None ),
		ListItem( 'Ally', @AHLCG-Slot-Ally ),
		ListItem( 'Accessory', @AHLCG-Slot-Accessory ),
		ListItem( 'Body', @AHLCG-Slot-Body ),
		ListItem( '1 Hand', @AHLCG-Slot-1Hand ),
		ListItem( '2 Hands', @AHLCG-Slot-2Hands ),
		ListItem( '1 Arcane', @AHLCG-Slot-1Arcane ),
		ListItem( '2 Arcane' , @AHLCG-Slot-2Arcane ),
		ListItem( 'Tarot', @AHLCG-Slot-Tarot ) );

	this.comboWeaknessTypes = new Array( 
		ListItem( 'BasicWeakness', @AHLCG-WknType-BasicWeakness ), 
		ListItem( 'Weakness', @AHLCG-WknType-Weakness ),
		ListItem( 'StoryWeakness', @AHLCG-WknType-StoryWeakness ) );

	this.comboWeaknessTypesI = new Array( 
		ListItem( 'BasicWeakness', @AHLCG-WknType-BasicWeakness ), 
		ListItem( 'Weakness', @AHLCG-WknType-Weakness ),
		ListItem( 'InvestigatorWeakness', @AHLCG-WknType-InvestigatorWeakness ),
		ListItem( 'StoryWeakness', @AHLCG-WknType-StoryWeakness ) );

	this.comboScenario = new Array( 
		ListItem( 'Portrait', @AHLCG-Scenario-Portrait ),
		ListItem( 'Title', @AHLCG-Scenario-Title ),
		ListItem( 'Resolution', @AHLCG-Scenario-Resolution ) );
				
	this.comboBacks = new Array( 
		ListItem( 'Player', @AHLCG-Back-Player ),
		ListItem( 'Encounter', @AHLCG-Back-Encounter ) );

	this.comboLocationBacks = new Array( 
		ListItem( 'Standard', @AHLCG-Back-Standard ),
		ListItem( 'Player', @AHLCG-Back-Player ),
		ListItem( 'Encounter', @AHLCG-Back-Encounter ) );

	this.comboGuide = new Array( 
		ListItem( 'Title', @AHLCG-Guide-Title ),
		ListItem( 'Empty', @AHLCG-Guide-Empty ) );

	this.comboTemplateOrientation = new Array( 
		ListItem( 'Standard', @AHLCG-Orientation-Standard ),
		ListItem( 'Reversed', @AHLCG-Orientation-Reversed ) );

	this.comboLevelsN = new Array(
		ListItem( 'None', @AHLCG-Level-None ) );
	for( let index = 0; index <= 5; index++ ){
		this.comboLevelsN[this.comboLevelsN.length] = ListItem( index, String(index) );
	}
								
	this.comboPortraitPosition1 = new Array( 
		ListItem( 'None', @AHLCG-Guide-None ),
		ListItem( 'TopLeftSmall', @AHLCG-Guide-TopLeftSmall ),
		ListItem( 'TopLeftMedium', @AHLCG-Guide-TopLeftMedium ),
		ListItem( 'TopLarge', @AHLCG-Guide-TopLarge ),
		ListItem( 'BottomLeftSmall', @AHLCG-Guide-BottomLeftSmall ),
		ListItem( 'BottomLeftMedium', @AHLCG-Guide-BottomLeftMedium ),
		ListItem( 'BottomLarge', @AHLCG-Guide-BottomLarge ),
		ListItem( 'LeftLarge', @AHLCG-Guide-LeftLarge ),
		ListItem( 'TopLeftCorner', @AHLCG-Guide-TopLeftCorner ),
		ListItem( 'BottomLeftCorner', @AHLCG-Guide-BottomLeftCorner ) );

	this.comboPortraitPosition2 = new Array( 	
		ListItem( 'None', @AHLCG-Guide-None ),
		ListItem( 'TopRightSmall', @AHLCG-Guide-TopRightSmall ),
		ListItem( 'TopRightMedium', @AHLCG-Guide-TopRightMedium ),
		ListItem( 'TopLarge', @AHLCG-Guide-TopLarge ),
		ListItem( 'BottomRightSmall', @AHLCG-Guide-BottomRightSmall ),
		ListItem( 'BottomRightMedium', @AHLCG-Guide-BottomRightMedium ),
		ListItem( 'BottomLarge', @AHLCG-Guide-BottomLarge ),
		ListItem( 'RightLarge', @AHLCG-Guide-RightLarge ),
		ListItem( 'TopRightCorner', @AHLCG-Guide-TopRightCorner ),
		ListItem( 'BottomRightCorner', @AHLCG-Guide-BottomRightCorner ) );

	this.comboStoryTemplate = new Array( 
		ListItem( 'Story', @AHLCG-StoryTemplate-Story ),
		ListItem( 'Chaos', @AHLCG-StoryTemplate-Token ) );

	this.comboStoryBackTemplate = new Array( 
		ListItem( 'Story', @AHLCG-StoryTemplate-Story ),
		ListItem( 'Chaos', @AHLCG-StoryTemplate-Token ),
		ListItem( 'Player', @AHLCG-Back-Player ),
		ListItem( 'Encounter', @AHLCG-Back-Encounter ) );

	this.comboStat = new Array();
	for( let index = 0; index <= 6; index++ ){
		this.comboStat[this.comboStat.length] = ListItem( index, String(index) );
	}

	this.comboInvestigatorHealth = new Array();
	for( let index = 1; index <= 15; index++ ){
		this.comboInvestigatorHealth[this.comboInvestigatorHealth.length] = ListItem( index, String(index) );
	}

	this.comboAssetStamina = new Array(
		ListItem( 'None', @AHLCG-Stamina-None ), 
		ListItem( '-', '-' ),
		ListItem( 'Star', '*' ) );
	for( let index = 1; index <= 15; index++ ){
		this.comboAssetStamina[this.comboAssetStamina.length] = ListItem( index, String(index) );
	}

	this.comboAssetSanity = new Array(
		ListItem( 'None', @AHLCG-Sanity-None ), 
		ListItem( '-', '-' ),
		ListItem( 'Star', '*' ) );
	for( let index = 1; index <= 15; index++ ){
		this.comboAssetSanity[this.comboAssetSanity.length] = ListItem( index, String(index) );
	}

	this.comboEnemyStat = new Array(
		ListItem( '-', '-' ),
		ListItem( '?', '?' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 29; index++ ){
		this.comboEnemyStat[this.comboEnemyStat.length] = ListItem( index, String(index) );
	}

	this.comboEnemyHealth = new Array(
		ListItem( '-', '-' ),
		ListItem( '?', '?' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 29; index++ ){
		this.comboEnemyHealth[this.comboEnemyHealth.length] = ListItem( index, String(index) );
	}

	this.comboCost = new Array(
		ListItem( '-', '-' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 19; index++ ) {
		this.comboCost[this.comboCost.length] = ListItem( index, String(index) );
	}
	
	this.comboClues = new Array(
	ListItem( '-', '-' ),
	ListItem( '?', '?' ) );
	for( let index = 1; index <= 19; index++ ) {
		this.comboClues[this.comboClues.length] = ListItem( index, String(index) );
	}
	
	this.combo5 = new Array();
	for( let index = 0; index <= 5; index++ ){
		this.combo5[index] = ListItem( index, String(index) );
	}

	this.combo20 = new Array();
	for( let index = 0; index < 20; index++ ){
		this.combo20[index] = ListItem( index+1, String(index+1) );
	}

	this.comboX20 = new Array(
		ListItem( 'X', 'X' )
	);
	for( let index = 0; index <= 20; index++ ){
		this.comboX20[this.comboX20.length] = ListItem( index, String(index) );
	}

	this.basicEncounterList = new Array(
		'CustomEncounterSet',
		'StrangeEons'
	);	
																
	// Highest = 248 (eotE)
	// NameKey, CollectionID, Tag, Index into select keys
	this.standardEncounterList = new Array(
		[ 'ALightInTheFog', 22, 'alitf', 199 ],
		[ 'APhantomOfTruth', 4, 'phntm', 50 ],
		[ 'AbyssalGifts', 8, 'abygfts', 87 ],
		[ 'AbyssalTribute', 8, 'abytrib', 88 ],
		[ 'AlienInterference', 13, 'alnint', 161 ],
		[ 'AllOrNothing', 14, 'allornothing', 168 ],
		[ 'AgentsOfAtlachNacha', 12, 'agtan', 141 ],
		[ 'AgentsOfAzathoth', 10, 'agtaz', 107 ],
		[ 'AgentsOfCthulhu', 0, 'agtcth', 0 ],
		[ 'AgentsOfDagon', 22, 'agtdag', 187 ],
		[ 'AgentsOfHastur', 0, 'agthas', 1 ],
		[ 'AgentsOfHydra', 22, 'agyhyd', 188 ],
		[ 'AgentsOfNyarlathotep', 12, 'agtnya', 142 ],
		[ 'AgentsOfShubNiggurath', 0, 'agtshb', 2 ],
		[ 'AgentsOfTheUnknown', 25, 'agtunk', 225 ],
		[ 'AgentsOfYig', 5, 'agtyig', 56 ],
		[ 'AgentsOfYogSothoth', 0, 'agtyog', 3 ],
		[ 'AncientEvils', 0, 'ancevl', 4 ],
		[ 'AnettesCoven', 10, 'anette', 108 ],
		[ 'ArmitagesFate', 1, 'armfat', 5 ],
		[ 'AtDeathsDoorstep', 10, 'atdths', 109 ],
		[ 'AThousandShapesOfHorror', 12, 'atsoh', 143 ],
		[ 'BadLuck', 1, 'badlck', 6 ],
		[ 'BeastThralls', 1, 'bstthrl', 33 ],
		[ 'BeforeTheBlackThrone', 10, 'btbt', 110 ],
		[ 'BeyondTheGatesOfSleep', 12, 'btgos', 144 ],
		[ 'BeyondTheThreshold', 9, 'byndthr', 93 ],
		[ 'BishopsThralls', 1, 'bpthrl', 7 ],
		[ 'BlackStarsRise', 4, 'bsr', 52 ],
		[ 'BloodOnTheAltar', 1, 'bldalt', 31 ],
		[ 'BloodthirstySpirits', 24, 'bldspi', 209 ],
		[ 'BrotherhoodOfTheBeast', 8, 'bhdbst', 89 ],
		[ 'Byakhee', 4, 'byak', 48 ],
		[ 'CarnevaleOfHorrorsE', 3, 'carhor', 8 ],
		[ 'ChildrenOfParadise', 23, 'chpar', 205 ],
		[ 'ChillingCold', 0, 'chlcld', 9 ],
		[ 'ChillingMists', 24, 'chlmst', 210 ],
		[ 'CityOfSins', 10, 'ctysins', 111 ],
		[ 'CityOfTheDamned', 24, 'ctydmn', 211 ],
		[ 'CityOfTheElderThings', 25, 'ctyet', 226 ],
		[ 'Corsairs', 12, 'cors', 145 ],
		[ 'CreaturesInTheIce', 25, 'creice', 227 ],
		[ 'CreaturesOfTheDeep', 22, 'credeep', 189 ],
		[ 'CreaturesOfTheUnderworld', 12, 'cotu', 146 ],
		[ 'CreepingCold', 9, 'crpcld', 94 ],
		[ 'CultOfPnakotus', 16, 'cltpna', 171 ],
		[ 'CultOfTheYellowSign', 4, 'cltyel', 37 ],
		[ 'CultOfUmordhoth', 0, 'cltumh', 10 ],
		[ 'ReturnToCultOfUmordhoth', 7, 'cltumhr', 81 ],
		[ 'CurseOfTheRougarouE', 2, 'currou', 11 ],
		[ 'CurtainCall', 4, 'curtncl', 38 ],
		[ 'DarkCult', 0, 'dkcult', 12 ],
		[ 'DarkRituals', 13, 'dkrit', 162 ],
		[ 'DarkSideOfTheMoon', 12, 'dsotm', 147 ],
		[ 'DeadlyTraps', 5, 'deadtrp', 57 ],
		[ 'DeadlyWeather', 25, 'deadwthr', 228 ],
		[ 'DeathOfStars', 23, 'dthstrs', 206 ],
		[ 'DecayAndFilth', 4, 'decay', 39 ],
		[ 'DecayingReality', 11, 'decrea', 128 ],
		[ 'Delusions', 4, 'delusn', 40 ],
		[ 'DelusoryEvils', 11, 'delevl', 129 ],
		[ 'DescentIntoThePitch', 12, 'ditp', 148 ],
		[ 'DevilReef', 22, 'devreef', 200 ],
		[ 'DimCarcosa', 4, 'dimcar', 55 ],
		[ 'DisappearanceAtTheTwilightEstate', 10, 'datte', 112 ],
		[ 'DoomedExpedition', 16, 'dmdexp', 172 ],
		[ 'DreamersCurse', 12, 'drmcur', 149 ],
		[ 'Dreamlands', 12, 'drmlnds', 150 ],
		[ 'Dunwich', 1, 'dunwch', 32 ],
		[ 'EchoesOfThePast', 4, 'echoes', 46 ],
		[ 'ElderThings', 25, 'eldthg', 229 ],
		[ 'EpicMultiplayer', 6, 'epicmp', 79 ],
		[ 'ErraticFear', 9, 'errfr', 95 ],
		[ 'EvilPortents', 4, 'evilpor', 41 ],
		[ 'ExcelsiorManagement', 13, 'exman', 163 ],
		[ 'Expedition', 5, 'exped', 58 ],
		[ 'ExpeditionTeam', 25, 'exptm', 230 ],
		[ 'ExtracurricularActivity', 1, 'extact', 13 ],
		[ 'FatalMirage', 25, 'fatmir', 231 ],
		[ 'FloodedCaverns', 22, 'flocav', 190 ],
		[ 'FogOverInnsmouth', 22, 'foginn', 191 ],
		[ 'ForgottenRuins', 5, 'fruins', 59 ],
		[ 'ForTheGreaterGood', 10, 'ftgg', 113 ],
		[ 'Ghouls', 0, 'ghouls', 14 ],
		[ 'GhoulsOfUmordhoth', 7, 'ghoum', 82 ],
		[ 'GuardiansOfTime', 5, 'guatim', 60 ],
		[ 'HastursEnvoys', 11, 'hasenv', 130 ],
		[ 'HastursGift', 4, 'hasgft', 42 ],
		[ 'Hauntings', 4, 'haunt', 43 ],
		[ 'HazardsOfAntarctica', 25, 'hazant', 232 ],
		[ 'HeartOfTheElders', 5, 'hrteld', 71 ],
		[ 'Hexcraft', 24, 'hexcft', 212 ],
		[ 'HideousAbominations', 1, 'hidabo', 15 ],
		[ 'HorrorInHighGear', 22, 'hihg', 201 ],
		[ 'IceAndDeath', 25, 'icedth', 233 ],
		[ 'ImpendingEvils', 24, 'impevl', 213 ],
		[ 'InTheClutchesOfChaos', 10, 'itcoc', 115 ],
		[ 'InTooDeep', 22, 'indeep', 202 ],
		[ 'InexorableFate', 10, 'inexft', 114 ],
		[ 'InhabitantsOfCarcosa', 4, 'inhcar', 49 ],
		[ 'IntoTheMaelstrom', 22, 'inmael', 203 ],
		[ 'KnYan', 5, 'knyan', 73 ],
		[ 'LeftBehind', 25, 'lftbhd', 234],
		[ 'LockedDoors', 0, 'lckdrs', 16 ],
		[ 'LostInTheNight', 25, 'litn', 235 ],
		[ 'LostInTimeAndSpace', 1, 'litas', 36 ],
		[ 'MaddeningDelusions', 11, 'maddel', 131 ],
		[ 'Malfunction', 22, 'malfctn', 192 ],
		[ 'MemorialsOfTheLost', 25, 'motl', 236 ],
		[ 'MergingRealities', 12, 'merreal', 151 ],
		[ 'Miasma', 25, 'mias', 237 ],
		[ 'MiGoIncursion', 15, 'migoinc', 170 ],
		[ 'MurderAtTheExcelsiorHotelE', 13, 'matehe', 164 ],
		[ 'MusicOfTheDamned', 10, 'motd', 116 ],
		[ 'NamelessHorrors', 25, 'nmlshor', 238 ],
		[ 'NaomisCrew', 1, 'naocrw', 17 ],
		[ 'NeuroticFear', 11, 'neufr', 132 ],
		[ 'Nightgaunts', 0, 'ntgnts', 18 ],
		[ 'Penguins', 25, 'peng', 239 ],
		[ 'PillarsOfJudgment', 5, 'piljdg', 72 ],
		[ 'PnakoticBrotherhood', 5, 'pnabro', 61 ],
		[ 'PointOfNoReturn', 12, 'ponr', 152 ],
		[ 'Poison', 5, 'poison', 62 ],
		[ 'Rainforest', 5, 'rainfst', 63 ],
		[ 'Rats', 0, 'rats', 19 ],
		[ 'ReadOrDie', 14, 'readordie', 167 ],
		[ 'RealmOfDeath', 10, 'rlmdth', 117 ],
		[ 'ResurgentEvils', 9, 'resevl', 96 ],
		[ 'ReturnToAPhantomOfTruth', 11, 'rphntm', 133 ],
		[ 'ReturnToAtDeathsDoorstep', 24, 'ratdths', 214 ],
		[ 'ReturnToBeforeTheBlackThrone', 24, 'rbtbt', 215 ],
		[ 'ReturnToBlackStarsRise', 11, 'rbsr', 134 ],
		[ 'ReturnToBloodOnTheAltar', 9, 'rbldalt', 97 ],
		[ 'ReturnToCurtainCall', 11, 'rcurtncl', 135 ],
		[ 'ReturnToDimCarcosa', 11, 'rdimcar', 136 ],
		[ 'ReturnToDisappearanceAtTheTwilightEstate', 24, 'rdatte', 216 ],
		[ 'ReturnToEchoesOfThePast', 11, 'rechoes', 137 ],
		[ 'ReturnToExtracurricularActivities', 9, 'rextact', 98 ],
		[ 'ReturnToForTheGreaterGood', 24, 'rftgg', 217 ],
		[ 'ReturnToHeartOfTheElders', 16, 'rhrteld', 173 ],
		[ 'ReturnToInTheClutchesOfChaos', 24, 'ritcoc', 218	],
		[ 'ReturnToKnYan', 16, 'rknyan', 174 ],
		[ 'ReturnToLostInTimeAndSpace', 9, 'rtlitas', 99 ],
		[ 'ReturnToPillarsOfJudgment', 16, 'rpiljdg', 175 ],
		[ 'ReturnToShatteredAeons', 16, 'rshaaon', 176 ],
		[ 'ReturnToTheBoundaryBeyond', 16, 'rbndry', 177 ],
		[ 'ReturnToTheCityOfArchives', 16, 'rctyarc', 178 ],
		[ 'ReturnToTheDepthsOfYoth', 16, 'rtdoy', 179 ],
		[ 'ReturnToTheDevourerBelow', 7, 'rdevbel', 83 ],
		[ 'ReturnToTheDoomOfEztli', 16, 'rdmeztli', 180 ],
		[ 'ReturnToTheEssexCountyExpress', 9, 'resxexp', 100 ],
		[ 'ReturnToTheRainforest', 16, 'rrainfst', 181 ],
		[ 'ReturnToTheGathering', 7, 'rgather', 84 ],
		[ 'ReturnToTheHouseAlwaysWins', 9, 'rhsewin', 101 ],
		[ 'ReturnToTheLastKing', 11, 'rlstkng', 138 ],
		[ 'ReturnToTheMidnightMasks', 7, 'rmidmsk', 85 ],
		[ 'ReturnToTheMiskatonicMuseum', 9, 'rmskmus', 102 ],
		[ 'ReturnToThePallidMask', 11, 'rpalmsk', 139 ],
		[ 'ReturnToTheSecretName', 24, 'rsecrtnm', 219 ],
		[ 'ReturnToTheUnspeakableOath', 11, 'runspk', 140 ],	
		[ 'ReturnToTheUntamedWilds', 16, 'runtmdwld', 182 ],
		[ 'ReturnToTheWagesOfSin', 24, 'rtwos', 220 ],
		[ 'ReturnToTheWitchingHour', 24, 'rwtchhr', 221 ],
		[ 'ReturnToThreadsOfFate', 16, 'rtof', 183 ],
		[ 'ReturnToTurnBackTime', 16, 'rtbt', 184 ],
		[ 'ReturnToUndimensionedAndUnseen', 9, 'rundim', 103 ],
		[ 'ReturnToUnionAndDisillusion', 24, 'rundis', 222 ],
		[ 'ReturnToWhereDoomAwaits', 9, 'rtwda', 104 ],
		[ 'RisingTide', 22, 'ristide', 193 ],
		[ 'SandsOfEgypt', 8, 'sdsegpt', 90 ],
		[ 'SecretDoors', 9, 'scrtdr', 105 ],
		[ 'SecretsOfTheUniverse', 10, 'sotu', 118 ],
		[ 'SeepingNightmares', 25, 'seepnm', 240 ],
		[ 'Serpents', 5, 'serpent', 64 ],
		[ 'ShatteredAeons', 5, 'shaaon', 76 ],
		[ 'ShatteredMemories', 22, 'shamem', 194 ],
		[ 'Shoggoths', 25, 'shog', 241 ],
		[ 'SilenceAndMystery', 25, 'silmys', 242 ],
		[ 'SilverTwilightLodge', 10, 'siltwil', 119 ],
		[ 'SingleGroup', 6, 'singrp', 80 ],
		[ 'SinsOfThePast', 13, 'sotp', 165 ],
		[ 'Sorcery', 1, 'sorcry', 20 ],
		[ 'SpectralPredators', 10, 'specpred', 120 ],
		[ 'Spiders', 12, 'spdrs', 153 ],
		[ 'StirringInTheDeep', 25, 'strdp', 243 ],
		[ 'StrikingFear', 0, 'strfr', 21 ],
		[ 'SwarmOfAssimilation', 23, 'swmass', 207 ],
		[ 'Syzygy', 22, 'syzygy', 195 ],
		[ 'TekeliLi', 25, 'tekli', 244 ],
		[ 'TemporalFlux', 5, 'temflx', 65 ],
		[ 'TemporalHunters', 16, 'tmphnt', 185 ],
		[ 'TerrorOfTheVale', 12, 'totv', 154 ],
		[ 'TheBayou', 2, 'bayou', 22 ],
		[ 'TheBeyond', 1, 'beyond', 23 ],
		[ 'TheBlobThatAteEverythingE', 15, 'blob', 169 ],
		[ 'TheBoundaryBeyond', 5, 'bndry', 70 ],
		[ 'TheCityOfArchives', 5, 'ctyarc', 75 ],	// this is out of order, cuz I'm dumb
		[ 'TheCrash', 25, 'crash', 245 ],
		[ 'TheDepthsOfYoth', 5, 'tdoy', 74 ],
		[ 'TheDevourerBelow', 0, 'devbel', 24 ],
		[ 'TheDevourersCult', 7, 'devclt', 86 ],
		[ 'TheDoomOfEztli', 5, 'dmeztli', 66 ],
		[ 'TheEssexCountyExpress', 1, 'esxexp', 25 ],
		[ 'TheEternalSlumber', 8, 'eslmbr', 91 ],
		[ 'TheFloodBelow', 4, 'flood', 53 ],
		[ 'TheGathering', 0, 'gather', 26 ],
		[ 'TheGreatSeal', 25, 'grtsl', 246 ],
		[ 'TheHeartOfMadness', 25, 'thom', 247 ],
		[ 'TheHouseAlwaysWins', 1, 'hsewin', 27 ],
		[ 'TheLabyrinthsOfLunacyE', 6, 'lablun', 78 ],
		[ 'TheLairOfDagon', 22, 'tlod', 204 ],
		[ 'TheLastKing', 4, 'lstkng', 44 ],
		[ 'TheLocals', 22, 'locals', 196 ],
		[ 'TheMidnightMasks', 0, 'midmsk', 28 ],
		[ 'TheMiskatonicMuseum', 1, 'mskmus', 29 ],
		[ 'TheNightsUsurper', 8, 'ntusrpr', 92 ],
		[ 'ThePallidMask', 4, 'palmsk', 51 ],		
		[ 'ThePitOfDespair', 22, 'pitdes', 197 ],
		[ 'TheSearchForKadath', 12, 'tsfk', 155 ],
		[ 'TheSecretName', 10, 'secrtnm', 121 ],
		[ 'TheStranger', 4, 'strngr', 45 ],
		[ 'TheUnspeakableOath', 4, 'unspk', 47 ],
		[ 'TheUntamedWilds', 5, 'untmdwld', 67 ],
		[ 'TheVanishingOfElinaHarper', 22, 'vaneh', 198],
		[ 'TheVortexAbove', 4, 'vortex', 54 ],
		[ 'TheWagesOfSin', 10, 'twos', 122 ],
		[ 'TheWatcher', 10, 'watcher', 123 ],
		[ 'TheWitchingHour', 10, 'wtchhr', 124 ],
		[ 'ThreadsOfFate', 5, 'tof', 69 ],
		[ 'ToTheForbiddenPeaks', 25, 'ttfp', 248 ],
		[ 'TrappedSpirits', 10, 'trpspi', 125 ],
		[ 'TurnBackTime', 5, 'tbt', 77 ],
		[ 'UndimensionedAndUnseen', 1, 'undim', 34 ],
		[ 'UnionAndDisillusion', 10, 'undis', 126 ],
		[ 'UnspeakableFate', 24, 'suspft', 223 ],
		[ 'UnstableRealm', 24, 'unsrlm', 224 ],
		[ 'VenomousHate', 16, 'vnmhate', 186 ],
		[ 'VileExperiments', 13, 'vileex', 166 ],
		[ 'WakingNightmare', 12, 'wkngnm', 156 ],
		[ 'WarOfTheOuterGodsE', 23, 'wotog', 208 ],
		[ 'WeaverOfTheCosmos', 12, 'wotc', 157 ],
		[ 'WhereDoomAwaits', 1, 'wda', 35 ],
		[ 'WhereTheGodsDwell', 12, 'wtgd', 158 ],
		[ 'Whippoorwills', 1, 'whip', 30 ],
		[ 'WhispersOfHypnos', 12, 'woh', 159 ],
		[ 'Witchcraft', 10, 'witch', 127 ],
		[ 'YigsVenom', 5, 'yigvnm', 68 ],
		[ 'YogSothothsEmissaries', 9, 'yogem', 106],
		[ 'Zoogs', 12, 'zoogs', 160 ]
	);

	this.basicCollectionList = new Array(
		'CustomCollection',
		'StrangeEons'
	);

	this.standardCollectionList = new Array(
		[ 'CoreSet', 'core' ],							//  0
		[ 'TheDunwichLegacy', 'dunleg' ],				//  1
		[ 'CurseOfTheRougarou', 'ccurrou' ],			//  2
		[ 'CarnevaleOfHorrors', 'ccarhor' ],			//  3
		[ 'ThePathToCarcosa', 'carcosa' ],				//  4
		[ 'TheForgottenAge', 'forage' ],				//  5
		[ 'TheLabyrinthsOfLunacy', 'lablun' ],			//  6
		[ 'ReturnToTheNightOfTheZealot', 'rtnotz' ],	//  7
		[ 'GuardiansOfTheAbyss', 'guaaby' ],			//  8
		[ 'ReturnToTheDunwichLegacy', 'rttdl' ],		//  9
		[ 'TheCircleUndone', 'cirund' ],				// 10
		[ 'ReturnToThePathToCarcosa', 'rttptc' ],		// 11
		[ 'TheDreamEaters', 'dreeat' ],					// 12
		[ 'MurderAtTheExcelsiorHotel', 'mateh' ],		// 13
		[ 'ParallelInvestigators', 'parallel' ],		// 14
		[ 'TheBlobThatAteEverything', 'blob' ],			// 15
		[ 'ReturnToTheForgottenAge', 'rttfa' ],			// 16
		[ 'NathanielCho', 'natcho' ],					// 17
		[ 'HarveyWalters', 'harwal' ],					// 18
		[ 'WinifredHabbamock', 'winhab' ],				// 19
		[ 'JacquelineFine', 'jacfin' ],					// 20
		[ 'StellaClark', 'stecla' ],					// 21
		[ 'TheInnsmouthConspiracy', 'tic' ],			// 22
		[ 'WarOfTheOuterGods', 'cwotog' ],	 			// 23
		[ 'ReturnToTheCircleUndone', 'rttcu' ],			// 24
		[ 'EdgeOfTheEarth', 'eote' ]					// 25
	);
	
	this.encounterTypes = new Array();
	this.collectionTypes = new Array();

	updateUsedEncounterSets( this );
	updateUsedCollections( this );
						
	this.TagList = new Array (
		'Fast', 'Name', 'HorizontalSpacer', 'LargeVerticalSpacer', 'VerticalSpacer', 
		'SmallVerticalSpacer', 'Action', 'Reaction', 'Fast',
		'Guardian', 'Seeker', 'Rogue', 'Mystic', 'Survivor',
		'Willpower', 'Intellect', 'Combat', 'Agility', 'Wild',
		'Skull', 'Cultist', 'Artifact', 'Monster', 'Bless', 'Curse', 'Frost', 'ElderSign', 'Tentacle',
		'Unique', 'PerInvestigator', 'Prey', 'Spawn', 'Revelation', 'Forced',
		'Objective', 'Haunted', 'Patrol', 'Bullet', 'Resolution', 'EndResolution', 'GuideBullet', 'Square',
		'Seal1', 'Seal2', 'Seal3', 'Seal4', 'Seal5'
	);
/*	
	this.TagListSmall = new Array (
		'FastSmall', 
//		'Name', 'HorizontalSpacer', 'LargeVerticalSpacer', 'VerticalSpacer', 
//		'SmallVerticalSpacer',
		'ActionSmall', 'ReactionSmall', 'FastSmall',
		'GuardianSmall', 'SeekerSmall', 'RogueSmall', 'MysticSmall', 'SurvivorSmall',
		'WillpowerSmall', 'IntellectSmall', 'CombatSmall', 'AgilitySmall', 'WildSmall',
		'SkullSmall', 'CultistSmall', 'ArtifactSmall', 'MonsterSmall', 'BlessSmall', 'CurseSmall',
		'FrostSmall', 'ElderSignSmall', 'TentacleSmall',
		'UniqueSmall', 'PerInvestigatorSmall',
//		'Prey', 'Spawn', 'Revelation', 'Forced',
//		'Objective', 'Haunted', 'Patrol', 
		'BulletSmall', 
//		'Resolution', 'EndResolution',
		'GuideBulletSmall', 'SquareSmall',
		'Seal1Small', 'Seal2Small', 'Seal3Small', 'Seal4Small', 'Seal5Small'
	);
*/	
	this.StyleList = new Array (
		'Trait', 'Flavor', 'Story', 'Victory', 'Header', 'Body',
		'TraitSection', 'FlavorSection', 'InvStorySection', 
		'ActStorySection', 'AgendaStorySection',
		'AHF'
	);

	this.SmallStyleTagList = new Array (
		'AHFSmall'
	);

	this.GuideStyleList = new Array (
		'GuideSection', 'GuideHeader', 'GuideBoxBullet'
	);

	this.CopyrightTagList = new Array (
		'Copyright'
	);

	this.SuffixTagList = new Array (
		'Suffix', 'BackSuffix'
	);

		this.locationIcons = [ 'Circle', 'Square', 'Triangle', 'Cross', 'Diamond', 'Slash', 'T', 'Hourglass', 'Moon', 'DoubleSlash', 'Heart', 'Star', 'Quote' , 'Clover', 'Spade', 'CircleAlt', 'SquareAlt', 'TriangleAlt', 'CrossAlt', 'DiamondAlt',
        'SlashAlt', 'TAlt', 'HourglassAlt', 'MoonAlt', 'DoubleSlashAlt', 'HeartAlt', 'StarAlt' ];


	this.comboConnections = new Array (
		ListItem( 'None', @AHLCG-LocIcon-None,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'Empty', @AHLCG-LocIcon-Empty,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			) 
		);
	
	this.comboConnectionsBack = [ 
		ListItem( 'Copy front', @AHLCG-LocIcon-CopyFront,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'None', @AHLCG-LocIcon-None,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'Empty', @AHLCG-LocIcon-Empty,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			)
		];

	this.baseLocationIcon = ImageUtils.get( 'ArkhamHorrorLCG/icons/AHLCG-LocationBase.png' );

	test_tinter = new TintCache( new TintFilter(), this.baseLocationIcon );

	for( let index = 0; index < this.locationIcons.length; index++ ) {
		let item = this.locationIcons[index];
		
		var hsb = masterSettings.getTint( 'AHLCG-' + item + '-tint' );
		test_tinter.setFactors( hsb[0], hsb[1], hsb[2] );

		let iconBaseImage = test_tinter.getTintedImage();
		
		let ig = iconBaseImage.createGraphics();

		ig.drawImage( ImageUtils.get( 'ArkhamHorrorLCG/icons/AHLCG-Loc' + item + '.png' ), 4, 4, null );

		this.comboConnections[index+2] = ListItem(
			item, @('AHLCG-LocIcon-' + item),
			ImageUtils.createIcon(iconBaseImage, 12, 12)		
			);
				
		this.comboConnectionsBack[index+3] = ListItem(
			item, @('AHLCG-LocIcon-' + item),
			ImageUtils.createIcon(iconBaseImage, 12, 12)		
			);

		ig.dispose();
	}	
	
	this.actTextShapes = new Array( null, null );
	this.agendaTextShapes = new Array( null, null );
	this.enemyPageShape = null;
	this.eventTextShape = null;
	this.locationTextShape = null;
	this.locationBackTextShape = null;
	this.skillTextShape = null;
	this.investigatorBackTextShapes = [];
	
	this.getIntBoxTint = function () {
		if ( this.intBoxTint ) return this.intBoxTint;
		
		this.intBoxTint = new TintCache( new TintFilter() );
		this.intBoxTint.setImage( ImageUtils.get( 'ArkhamHorrorLCG/overlays/AHLCG-BoxIntRed.png') );
						
		return this.intBoxTint;
	};
	this.getIntMidTint = function () {
		if ( this.intMidTint ) return this.intMidTint;
		
		this.intMidTint = new TintCache( new TintFilter() );
		this.intMidTint.setImage( ImageUtils.get( 'ArkhamHorrorLCG/overlays/AHLCG-BoxIntLineRed.png' ) );

		return this.intMidTint;
	};
	this.getBracketTint = function () {
		if ( this.bracketTint ) return this.bracketTint;
		
		this.bracketTint = new TintCache( new TintFilter() );
		this.bracketTint.setImage( ImageUtils.get( 'ArkhamHorrorLCG/overlays/AHLCG-BoxResBracketRed.png') );
						
		return this.bracketTint;
	};
	this.getResBoxTint = function () {
		if ( this.resBoxTint ) return this.resBoxTint;
		
		this.resBoxTint = new TintCache( new TintFilter() );
		this.resBoxTint.setImage( ImageUtils.get( 'ArkhamHorrorLCG/overlays/AHLCG-BoxResRed.png') );
						
		return this.resBoxTint;
	};
	this.getResMidTint = function () {
		if ( this.resMidTint ) return this.resMidTint;
		
		this.resMidTint = new TintCache( new TintFilter() );
		this.resMidTint.setImage( ImageUtils.get( 'ArkhamHorrorLCG/overlays/AHLCG-BoxResLineRed.png' ) );

		return this.resMidTint;
	};
	this.getActTextShape = function ( region, reverse ) {
		let nReverse = Number(reverse);

		if ( this.actTextShapes[nReverse] ) return this.actTextShapes[nReverse];
		
		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;
	
		var path = new java.awt.geom.Path2D.Double();

		var xPathPoints = new Array( 0.000, 0.000, 0.715, 0.830, 0.830, 1.000, 1.000 );
		var yPathPoints = new Array( 0.000, 1.000, 1.000, 0.957, 0.850, 0.850, 0.000 );
	
		var numPoints = xPathPoints.length;
	
		if ( reverse ) {
			// swap order and x-value
			for (let i = 0; i < numPoints / 2; i++) {
				let px = xPathPoints[i];
				let py = yPathPoints[i];
			
				xPathPoints[i] = 1.000 - xPathPoints[numPoints - i - 1];
				yPathPoints[i] = yPathPoints[numPoints - i - 1];
			
				xPathPoints[numPoints - i - 1] = 1.000 - px;
				yPathPoints[numPoints - i - 1] = py;
			}
		}
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.actTextShapes[nReverse] = PageShape.GeometricShape( path, region );

		return this.actTextShapes[nReverse];
	};
	this.getAgendaTextShape = function ( region, reverse ) {
		let nReverse = Number(reverse);

		if ( this.agendaTextShapes[nReverse] ) return this.agendaTextShapes[nReverse];

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;

		var path = new java.awt.geom.Path2D.Double();

		var xPathPoints = new Array( 0.000, 0.000, 0.148, 0.148, 1.000, 1.000 );
		var yPathPoints = new Array( 0.000, 0.850, 0.850, 1.000, 1.000, 0.000 );

		var numPoints = xPathPoints.length;
	
		if ( reverse ) {
			// swap order and x-value
			for (let i = 0; i < numPoints / 2; i++) {
				let px = xPathPoints[i];
				let py = yPathPoints[i];
			
				xPathPoints[i] = 1.000 - xPathPoints[numPoints - i - 1];
				yPathPoints[i] = yPathPoints[numPoints - i - 1];
			
				xPathPoints[numPoints - i - 1] = 1.000 - px;
				yPathPoints[numPoints - i - 1] = py;
			}
		}
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.agendaTextShapes[nReverse] = PageShape.GeometricShape( path, region );

		return this.agendaTextShapes[nReverse];
	};
	this.getEnemyTextShape = function ( region ) {
		if ( this.enemyTextShape ) return this.enemyTextShape;

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;
	
		var path = new java.awt.geom.Path2D.Double();
	
		var xPathPoints = new Array( 0.086, 0.086, 0.000, 0.000, 0.039, 0.078 );
		var yPathPoints = new Array( 0.000, 0.189, 0.189, 0.693, 0.800, 1.000 );

		var numPoints = xPathPoints.length;
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * (1 - xPathPoints[numPoints-1]), y + h * yPathPoints[numPoints-1] );

		for (let i = numPoints-2; i >= 0; i--) {
			path.lineTo( x + w * (1 - xPathPoints[i]), y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.enemyPageShape = PageShape.GeometricShape( path, region );
		
		return this.enemyPageShape;
	};
	this.getEventTextShape = function ( region ) {
		if ( this.eventTextShape ) return this.eventTextShape;

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;
	
		var path = new java.awt.geom.Path2D.Double();
	
//		var xPathPoints = new Array( 0.0, -0.054, -0.009, 0.179 );
//		var xPathPoints = new Array( 0.0, -0.054, -0.004, 0.179 );
		var xPathPoints = new Array( 0.0, -0.054, -0.004, 0.179 );
		var yPathPoints = new Array( 0.0, 0.333, 0.892, 1.0 );
	
		var xControlPoints = new Array( 0.004, -0.060, -0.083, 0.006, 0.088, 0.047 );
		var yControlPoints = new Array( 0.047, 0.193, 0.513, 0.674, 0.873, 0.993 );
	
		var numPoints = xPathPoints.length;
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.curveTo( x + w * xControlPoints[i*2 - 2], y + h * yControlPoints[i*2 - 2],
						  x + w * xControlPoints[i*2 - 1], y + h * yControlPoints[i*2 - 1],
						  x + w * xPathPoints[i], y + h * yPathPoints[i]
			);
		}

		path.lineTo( x + w * (1 - xPathPoints[numPoints-1]), y + h * yPathPoints[numPoints-1] );

		for (let i = numPoints-2; i >= 0; i--) {
			path.curveTo( x + w * (1.0 - xControlPoints[i*2 + 1]), y + h * yControlPoints[i*2 + 1],
						  x + w * (1.0 - xControlPoints[i*2]), y + h * yControlPoints[i*2],
						  x + w * (1.0 - xPathPoints[i]), y + h * yPathPoints[i]
			);
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.eventTextShape = PageShape.GeometricShape( path, region );
		
		return this.eventTextShape;
	};
	this.getLocationTextShape = function ( region ) {
		if ( this.locationTextShape ) return this.locationTextShape;

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;

		var path = new java.awt.geom.Path2D.Double();

		// asymmetrical	
		var xPathPoints = new Array( 0.074, 0.000, 0.000, 1.000, 1.000, 0.951, 0.926 );
		var yPathPoints = new Array( 0.000, 0.174, 1.000, 1.000, 0.319, 0.125, 0.000 );
	
		var xControlPoints = new Array( 0.037, 0.107, 0.991, 0.962, 0.936, 0.970 );
		var yControlPoints = new Array( 0.153, 0.139, 0.278, 0.167, 0.132, 0.174 );
	
		var numPoints = xPathPoints.length;
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		// just create by hand, it's asymmetrical
		path.curveTo( x + w * xControlPoints[0], y + h * yControlPoints[0],
			x + w * xControlPoints[1], y + h * yControlPoints[1],
			x + w * xPathPoints[1], y + h * yPathPoints[1]
		);
	
		for (let i = 2; i <= 4; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		for (let i = 5; i <= 6; i++) {
			path.curveTo( x + w * xControlPoints[i*2 - 8], y + h * yControlPoints[i*2 - 8],
				x + w * xControlPoints[i*2 - 7], y + h * yControlPoints[i*2 - 7],
				x + w * xPathPoints[i], y + h * yPathPoints[i]
			);
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.locationTextShape = PageShape.GeometricShape( path, region );
		
		return this.locationTextShape;
	};
	this.getLocationBackTextShape = function ( region ) {
		if ( this.locationBackTextShape ) return this.locationBackTextShape;

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;

//		var xPathPoints = new Array( 0.151, 0.000, 0.000, 1.000, 1.000, 0.849 );
		var xPathPoints = new Array( 0.111, 0.000, 0.000, 1.000, 1.000, 0.889 );
		var yPathPoints = new Array( 0.000, 0.204, 1.000, 1.000, 0.204, 0.000 );
	
		var path = new java.awt.geom.Path2D.Double();

		var numPoints = xPathPoints.length;

		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.locationBackTextShape = PageShape.GeometricShape( path, region );
		
		return this.locationBackTextShape;
	};
	this.getSkillTextShape = function ( region ) {
		if ( this.skillTextShape ) return this.skillTextShape;

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;
	
		var path = new java.awt.geom.Path2D.Double();
	
		var xPathPoints = new Array( 0.0, 0.015 );
		var yPathPoints = new Array( 0.0, 1.000 );
	
		var xControlPoints = new Array( 0.053, 0.088 );
		var yControlPoints = new Array( 0.307, 0.600 );
	
		var numPoints = xPathPoints.length;
	
		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 1; i < numPoints; i++) {
			path.curveTo( x + w * xControlPoints[i*2 - 2], y + h * yControlPoints[i*2 - 2],
						  x + w * xControlPoints[i*2 - 1], y + h * yControlPoints[i*2 - 1],
						  x + w * xPathPoints[i], y + h * yPathPoints[i]
			);
		}

		path.lineTo( x + w * (1 + xPathPoints[numPoints-1]), y + h * yPathPoints[numPoints-1] );

		for (let i = numPoints-2; i >= 0; i--) {
			path.curveTo( x + w * (1.0 + xControlPoints[i*2 + 1]), y + h * yControlPoints[i*2 + 1],
						  x + w * (1.0 + xControlPoints[i*2]), y + h * yControlPoints[i*2],
						  x + w * (1.0 + xPathPoints[i]), y + h * yPathPoints[i]
			);
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.skillTextShape = PageShape.GeometricShape( path, region );
		
		return this.skillTextShape;
	};
	this.getInvestigatorBackTextShape = function ( region, className ) {
		if ( this.investigatorBackTextShapes[className] ) return this.investigatorBackTextShapes[className];

		var x = region.x;
		var y = region.y;
		var w = region.width;
		var h = region.height;

		var pointArrays = getPathPointArrays( className );
	
		var xPathPoints = pointArrays[0];
		var yPathPoints = pointArrays[1];

		var path = new java.awt.geom.Path2D.Double();

		var numPoints = xPathPoints.length;

		path.moveTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );

		for (let i = 0; i < numPoints; i++) {
			path.lineTo( x + w * xPathPoints[i], y + h * yPathPoints[i] );
		}

		path.lineTo( x + w * xPathPoints[0], y + h * yPathPoints[0] );
		
		this.investigatorBackTextShapes[className] = PageShape.GeometricShape( path, region );
		
		return this.investigatorBackTextShapes[className];
	};
}
