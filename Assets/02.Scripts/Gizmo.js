#pragma strict

function OnDrawGizmos() {
	Gizmos.color = Color.yellow;
	Gizmos.DrawSphere(transform.position, 0.2F);
}