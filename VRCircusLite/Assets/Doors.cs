using System.Collections;
using UnityEngine;

public class Doors : MonoBehaviour {

	Animator animator;
	bool doorOpen;

	// Use this for initialization
	void Start () {
		doorOpen = false;
		animator = GetComponent<Animator> ();
	}

	void OnTriggerEnter(Collider col){
		if (col.gameObject.tag == "Player") {
			doorOpen = true;
			DoorControl ("Open");
		}
	}

	void OnTriggerExit(Collider col){
		if (doorOpen) {
			doorOpen = false;
			DoorControl ("Close");
		}
	}
	// Update is called once per frame
	void DoorControl (string direction) {
		animator.SetTrigger (direction);
	}
}
