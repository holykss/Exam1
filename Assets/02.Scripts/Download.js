#pragma strict

private var version : String;

function Start () {
//	GetVersion();
	StartDownload();
}

function GetVersion() {
	var www:WWW = new WWW("www.aaa.com/version.php");
	yield www;
	version = www.text;
}

function StartDownload() {
	var download : WWW = WWW.LoadFromCacheOrDownload("www.unity3dstudy.com/robot.unity3d", 1);
	// parseInt(version)
	yield download;
	
	if (download.error != null)
	{
		Debug.LogError(download.error);
		return;
	}
	
	var bundle = download.assetBundle;
	Application.LoadLevel("scMain");
	
}

function Update () {

}