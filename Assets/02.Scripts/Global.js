#pragma strict

public var EnemyPrefab : GameObject;
public var guiScore : UILabel;

private var SpwanPoints : GameObject[];
private var spwanNextTime : float = 0.0F;
private var spwanTime : float = 3.0F;
private var score : int = 0;
private var hp : int;

function Start()
{
	//assign spwan points
	SpwanPoints = GameObject.FindGameObjectsWithTag("SPOINT");

	hp = GameObject.Find("Player").GetComponent.<PlayerControl>().hp;
	GetScore(0);
}

function Update() {
	
	if (Time.time >= spwanNextTime)
	{
//		for (var _spwanPoint in SpwanPoints) {
//			Instantiate(EnemyPrefab, _spwanPoint.position, _spwanPoint.rotation);
//		}

		var idx = Random.Range(0, SpwanPoints.Length);
		Instantiate(EnemyPrefab, SpwanPoints[idx].transform.position, SpwanPoints[idx].transform.rotation);

		spwanNextTime = Time.time + spwanTime;
		
	}
}

function GetScore(point : int)
{
	score += point;
	
	guiScore.text = "SCORE [ff0000]" + score.ToString() + "[-]";
}

function PlaySfx(clip : AudioClip, pos : Vector3) 
{
	var goSfx = new GameObject("audio");
	
	goSfx.transform.position = pos;
	
	var source : AudioSource = goSfx.AddComponent(AudioSource);
	source.clip = clip;
	
	source.volume = 1.0F;
	source.Play();
	
	Destroy(goSfx, clip.length);
}

function OnPause()
{
	Time.timeScale = 0.0F;
}

function OnResume()
{
	Time.timeScale = 1.0F;
}