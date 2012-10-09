#pragma strict

class _animEnemy {
	var idle : AnimationClip;
	var walk : AnimationClip;
	var hit : AnimationClip;
	var die : AnimationClip;
	var attack : AnimationClip;
}

public var animEnemy : _animEnemy;
public var animBody : Animation;

public var player : GameObject;
public var nvAgent : NavMeshAgent;

private var traceNextTime : float = 0.0F;

function Start () {
	player = GameObject.Find("Player");
	nvAgent = gameObject.GetComponent.<NavMeshAgent>();
	//nvAgent = GetComponent(NavMeshAgent);
	
	nvAgent.destination = player.transform.position;
	
	animBody.clip = animEnemy.idle;
	animBody.Play();
	

}

function Update () {
	if (Time.time >= traceNextTime) {
		nvAgent.destination = player.transform.position;
		traceNextTime = Time.time + 0.3F;
	}

}