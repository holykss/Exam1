#pragma strict

public var SpwanPoints : Transform[];
public var EnemyPrefab : GameObject;
public var guiScore : GUIText;

private var spwanNextTime : float = 0.0F;
private var spwanTime : float = 3.0F;
private var score : int = 0;


function Start()
{
	GetScore(0);
}

function Update() {
	
	if (Time.time >= spwanNextTime)
	{
//		for (var _spwanPoint in SpwanPoints) {
//			Instantiate(EnemyPrefab, _spwanPoint.position, _spwanPoint.rotation);
//		}

		var idx = Random.Range(0, SpwanPoints.Length);
		Instantiate(EnemyPrefab, SpwanPoints[idx].position, SpwanPoints[idx].rotation);

		spwanNextTime = Time.time + spwanTime;
		
	}
}

function GetScore(point : int)
{
	score += point;
	
	guiScore.text = "SCORE " + score.ToString();
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
