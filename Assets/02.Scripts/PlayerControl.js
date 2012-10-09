#pragma strict


class _anim {
	var walk : AnimationClip;
	var walk_back : AnimationClip;
	var shoot : AnimationClip;
	var idle : AnimationClip[];
	var die : AnimationClip[];
	
	
}

public var anim : _anim;
public var animBody : GameObject;

private var speed : float = 10.0F;

public var firePos : Transform;
public var bulletPrefab : GameObject;

function Start()
{
	var idx : int = Random.Range(0, anim.idle.length);
	animBody.animation.clip = anim.idle[idx];
	animBody.animation.Play();
}

function Update () {

	var hor : float = Input.GetAxis("Horizontal");
	
	#if UNITY_EDITOR
	Debug.Log("Hor = " + hor.ToString());
	#endif
	
	
	var ver : float = Input.GetAxis("Vertical");
	#if UNITY_IPHONE || UNITY_ANDROID
	Debug.Log("Ver = " + ver);
	#endif
	
	transform.Translate(Vector3.forward * ver * Time.deltaTime * speed);
//	transform.Translate(Vector3.right * hor * Time.deltaTime * speed);
	transform.Rotate(Vector3.up * hor * Time.deltaTime * 100.0F);
	
	if (ver <0)
	{
		animBody.animation.CrossFade(anim.walk_back.name, 0.5F);
	}
	else if (ver > 0){// || hor != 0) {
		animBody.animation.CrossFade(anim.walk.name, 0.5F);
	}
	else 
	{
		animBody.animation.CrossFade(anim.idle[0].name, 0.5F);
	}
	
	if (Input.GetButtonDown("Jump")) {
		var _bullet : GameObject = Instantiate(bulletPrefab, firePos.position, firePos.rotation);
		
		Destroy(_bullet, 2.0F);
	}
	
}