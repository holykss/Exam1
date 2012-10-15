#pragma strict

@MenuItem ("Build/Build Scenes")
static function MyBuild() {
	var levels : String[] = [
		"Assets/01.Scenes/scMain.unity",
		"Assets/01.Scenes/scLevel1.unity",
		"Assets/01.Scenes/scPlay.unity"
		];
	
	BuildPipeline.BuildStreamedSceneAssetBundle(levels,
		"Build/robot.unity3d",
		BuildTarget.Android);
}
