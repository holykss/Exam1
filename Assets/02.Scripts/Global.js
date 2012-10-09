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