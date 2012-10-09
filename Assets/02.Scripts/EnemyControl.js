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
private var hp : int = 100;
private var isDie : boolean = false;

function Start () {
	player = GameObject.Find("Player");
	nvAgent = gameObject.GetComponent.<NavMeshAgent>();
	//nvAgent = GetComponent(NavMeshAgent);
	
	nvAgent.destination = player.transform.position;
	
	animBody.clip = animEnemy.idle;
	animBody.Play();
	

}

function Update () {

	if (isDie)
		return;
		
	if (Time.time >= traceNextTime) {
		nvAgent.destination = player.transform.position;
		traceNextTime = Time.time + 0.3F;
	}
	
	if ((player.transform.position - transform.position).sqrMagnitude <= 10.0F) {
		if (!animBody.IsPlaying(animEnemy.attack.name)) {
			animBody.CrossFade(animEnemy.attack.name, 0.2F);
		}
	}
	else 
	{
		if (!animBody.IsPlaying(animEnemy.walk.name)) {
			animBody.CrossFade(animEnemy.walk.name, 0.2F);
		}
	}

}

function OnCollisionEnter(Coll : Collision)
{
	if (isDie)
		return;
		
	if (Coll.gameObject.tag == "BULLET") {
		Destroy(Coll.gameObject);
		
		hp -= Coll.gameObject.GetComponent.<BulletControl>().damage;
		
		if (hp <= 0)
			Die();
		else
			animBody.CrossFade(animEnemy.hit.name, 0.01F);
		
	}
}

function Die()
{
	isDie = true;
	nvAgent.active = false;
	animBody.CrossFade(animEnemy.die.name, 0.2F);
	Destroy(gameObject, animEnemy.die.length + 0.5F);
}