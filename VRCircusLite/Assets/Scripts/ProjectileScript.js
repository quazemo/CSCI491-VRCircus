﻿#pragma strict

var physicsBody : Rigidbody;

// Use this for initialization
function Awake () 
{
	physicsBody = gameObject.GetComponent(Rigidbody);
}

function setSpeed(speed : Vector3)
{
	physicsBody.velocity = speed;
	physicsBody.isKinematic = false;
}

function OnCollisionEnter(col : Collision)
{
	//Debug.Log("Proj: hit " + col.gameObject.tag + " " + col.gameObject.transform.position);

	Destroy(gameObject);
}