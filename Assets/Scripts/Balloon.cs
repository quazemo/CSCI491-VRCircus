using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Balloon : MonoBehaviour {

	private Rigidbody rB;
	void Start()
	{
		rB = gameObject.GetComponent<Rigidbody>();
	}
	// Update is called once per frame
	void FixedUpdate () 
	{
		rB.AddForce(0.0f,-10.0f * rB.mass, 0.0f, ForceMode.Force);
	}
}
